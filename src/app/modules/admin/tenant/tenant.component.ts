import { CdkScrollable } from '@angular/cdk/scrolling';
import { AsyncPipe, CurrencyPipe, NgForOf, NgIf } from '@angular/common';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { FuseDrawerComponent } from '@fuse/components/drawer';
import { Observable } from 'rxjs';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { NewTenantComponent } from './new-tenant/new-tenant.component';

@Component({
  selector: 'app-tenant',
  standalone: true,
  templateUrl: './tenant.component.html',
  styles: [
    /* language=SCSS */
    `
        .inventory-grid {
            grid-template-columns: 48px auto 40px;

            @screen sm {
                grid-template-columns: 48px auto 112px 72px;
            }

            @screen md {
                grid-template-columns: 48px 112px auto 112px 72px;
            }

            @screen lg {
                grid-template-columns: 48px 112px auto 112px 96px 96px 72px;
            }
        }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  imports: [MatIconModule, RouterLink, MatButtonModule, CdkScrollable, NgIf,
    AsyncPipe, NgForOf, CurrencyPipe, MatButtonModule, MatMenuModule,
    FuseDrawerComponent, MatDividerModule, MatSidenavModule, NewTenantComponent],
})
export class TenantComponent {

  @ViewChild('addDrawer', { static: false }) addDrawer: FuseDrawerComponent;
  public productsData: any[] = [
    {
      id: '1',
      name: 'Laptop',
      category: 'Electronics',
      vendor: 'Vendor X',
      stock: 20,
      reserved: 5,
      cost: 800,
      basePrice: 999,
      taxPercent: 10,
      price: 1099,
      weight: 1.5,
      thumbnail: 'laptop-thumbnail.jpg',
      images: ['laptop-image1.jpg', 'laptop-image2.jpg'],
      active: true
    },
    {
      id: '2',
      name: 'Smartphone',
      category: 'Electronics',
      vendor: 'Vendor Y',
      stock: 30,
      reserved: 10,
      cost: 500,
      basePrice: 699,
      taxPercent: 8,
      price: 759,
      weight: 0.5,
      thumbnail: 'smartphone-thumbnail.jpg',
      images: ['smartphone-image1.jpg', 'smartphone-image2.jpg'],
      active: true
    },
    // Add more products here...
  ];

  public products$: Observable<any[]> = new Observable(observer => {
    observer.next(this.productsData);
    observer.complete();
  });

  drawerComponent: 'new-tenant';
  /**
   * Constructor
   */
  constructor()
  {
  }

  addTenant() {
    this.drawerComponent = 'new-tenant';
    this.addDrawer.open();
  }

}
