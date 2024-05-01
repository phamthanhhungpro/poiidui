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
import { MatSidenavModule } from '@angular/material/sidenav';
import { NewAppComponent } from './new-app/new-app.component';
import { EditAppComponent } from './edit-app/edit-app.component';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-app',
  standalone: true,
  templateUrl: './app.component.html',
  styles: [
    /* language=SCSS */
    `
        .app-grid {
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
    FuseDrawerComponent, MatDividerModule, MatSidenavModule, NewAppComponent,
    EditAppComponent],
})
export class AppComponent {

  @ViewChild('addDrawer', { static: false }) addDrawer: FuseDrawerComponent;
  public appsData: any[] = [
    {
      stt: '1',
      id: '1',
      name: 'Thần số học',
      code: 'TK',
      description: 'Vẽ những con số diệu kì từ những giấc mơ',
    },
    {
      stt: '2',
      id: '2',
      name: 'Lập trình',
      code: 'LT',
      description: 'Xây nên những ngồi nhà từ những dòng code',
    },
  ];

  public apps$: Observable<any[]> = new Observable(observer => {
    observer.next(this.appsData);
    observer.complete();
  });

  drawerComponent: 'new-app' | 'edit-app';
  configForm: UntypedFormGroup;

  /**
   * Constructor
   */
  constructor(private _fuseConfirmationService: FuseConfirmationService,
              private _formBuilder: UntypedFormBuilder,
  )
  {
  }

  ngOnInit(): void
  {
      // Build the config form
      this.configForm = this._formBuilder.group({
          title      : 'Xóa ứng dụng',
          message    : 'Xóa ứng dụng này khỏi hệ thống? <span class="font-medium">Thao tác này không thể hoàn tác!</span>',
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
  }

  addApp() {
    this.drawerComponent = 'new-app';
    this.addDrawer.open();
  }

  closeDrawer() {
    this.addDrawer.close();
  }

  editApp(app: any) {
    console.log(app);
    this.drawerComponent = 'edit-app';
    this.addDrawer.open();
  }

  deleteApp(app: any) {
    this.openConfirmationDialog();
  }

  openConfirmationDialog(): void
  {
      // Open the dialog and save the reference of it
      const dialogRef = this._fuseConfirmationService.open(this.configForm.value);

      // Subscribe to afterClosed from the dialog reference
      dialogRef.afterClosed().subscribe((result) =>
      {
          console.log(result);
          if(result === 'confirmed') {
            console.log('Delete');
          }
      });
  }
}
