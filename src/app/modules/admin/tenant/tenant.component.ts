import { CdkScrollable } from '@angular/cdk/scrolling';
import { AsyncPipe, CurrencyPipe, NgForOf, NgIf } from '@angular/common';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { FuseDrawerComponent } from '@fuse/components/drawer';
import { Observable, map } from 'rxjs';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { NewTenantComponent } from './new-tenant/new-tenant.component';
import { EditTenantComponent } from './edit-tenant/edit-tenant.component';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { TenantService } from 'app/services/tenant.service';

@Component({
  selector: 'app-tenant',
  standalone: true,
  templateUrl: './tenant.component.html',
  styles: [
    /* language=SCSS */
    `
        .tenant-grid {
            grid-template-columns: 48px auto 40px;

            @screen sm {
                grid-template-columns: 48px auto 112px 72px;
            }

            @screen md {
                grid-template-columns: 48px auto 112px 72px;
            }

            @screen lg {
                grid-template-columns: 48px 112px 200px auto 96px;
            }
        }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  imports: [MatIconModule, RouterLink, MatButtonModule, CdkScrollable, NgIf,
    AsyncPipe, NgForOf, CurrencyPipe, MatButtonModule, MatMenuModule,
    FuseDrawerComponent, MatDividerModule, MatSidenavModule, NewTenantComponent,
    EditTenantComponent],
})
export class TenantComponent {

  @ViewChild('addDrawer', { static: false }) addDrawer: FuseDrawerComponent;

  public tenants$: Observable<any[]>;

  drawerComponent: 'new-tenant' | 'edit-tenant';
  configForm: UntypedFormGroup;
  selectedData: any;
  /**
   * Constructor
   */
  constructor(private _fuseConfirmationService: FuseConfirmationService,
              private _formBuilder: UntypedFormBuilder,
              private _tenantService: TenantService
  )
  {
  }

  ngOnInit(): void
  {
      // Build the config form
      this.configForm = this._formBuilder.group({
          title      : 'Xóa cơ quan',
          message    : 'Xóa cơ quan này khỏi hệ thống? <span class="font-medium">Thao tác này không thể hoàn tác!</span>',
          icon       : this._formBuilder.group({
              show : true,
              name : 'heroicons_outline:exclamation-triangle',
              color: 'warn',
          }),
          actions    : this._formBuilder.group({
              confirm: this._formBuilder.group({
                  show : true,
                  label: 'Remove',
                  color: 'warn',
              }),
              cancel : this._formBuilder.group({
                  show : true,
                  label: 'Cancel',
              }),
          }),
          dismissible: true,
      });

      this.getTenants();
  }

  addTenant() {
    this.drawerComponent = 'new-tenant';
    this.addDrawer.open();
  }

  closeDrawer() {
    this.addDrawer.close();
  }

  editTenant(tenant: any) {
    this.drawerComponent = 'edit-tenant';
    this.addDrawer.open();
    // pass data to edit-tenant component
    this.selectedData = tenant;
  }

  deleteTenant(tenant): void
  {
      // Open the dialog and save the reference of it
      const dialogRef = this._fuseConfirmationService.open(this.configForm.value);

      // Subscribe to afterClosed from the dialog reference
      dialogRef.afterClosed().subscribe((result) =>
      {
          console.log(result);
          if(result === 'confirmed') {
            this._tenantService.delete(tenant.id).subscribe(() => {
              this.getTenants();
            });
          }
      });
  }

  // get data from api
  getTenants() {
    console.log('get tenants');
    this.tenants$ = this._tenantService.getAll().pipe(
      map((tenants: any[]) => {
        return tenants.map((tenant, index) => {
          return {
            ...tenant,
            stt: index + 1
          };
        });
      })
    );
  }
}
