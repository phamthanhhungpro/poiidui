import { CdkScrollable } from '@angular/cdk/scrolling';
import { AsyncPipe, CurrencyPipe, NgForOf, NgIf } from '@angular/common';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { FuseDrawerComponent } from '@fuse/components/drawer';
import { map } from 'rxjs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NewAppComponent } from './new-app/new-app.component';
import { EditAppComponent } from './edit-app/edit-app.component';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { AppService } from 'app/services/app.service';
import { AddUserToAppComponent } from './add-user-to-app/add-user-to-app.component';

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
                grid-template-columns: 100px auto 112px;
            }

            @screen md {
                grid-template-columns: 100px auto 112px;
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
    EditAppComponent, AddUserToAppComponent],
})
export class AppComponent {

  @ViewChild('addDrawer', { static: false }) addDrawer: FuseDrawerComponent;
  @ViewChild('paginator') paginator: MatPaginator;
  
  apps$;
  drawerComponent: 'new-app' | 'edit-app' | 'add-user-to-app';
  configForm: UntypedFormGroup;
  selectedData: any;
  addUserType : 'add-appadmin' | 'add-member';
  pageSize = 10; // Initial page size
  pageNumber = 0; // Initial page index
  totalItems = 0; // Total items
  /**
   * Constructor
   */
  constructor(private _fuseConfirmationService: FuseConfirmationService,
              private _formBuilder: UntypedFormBuilder,
              private _appService: AppService
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

      this.getApps();
  }

  addApp() {
    this.drawerComponent = 'new-app';
    this.addDrawer.open();
  }

  // we need this function to distroy the child component when drawer is closed
  drawerOpenedChanged(isOpened) {
    if (!isOpened) {
      this.drawerComponent = null;
    }
  }

  editApp(app: any) {
    this.drawerComponent = 'edit-app';
    this.addDrawer.open();

    // pass data to edit-app component
    this.selectedData = app;
  }

  deleteApp(app): void 
  {
      // Open the dialog and save the reference of it
      const dialogRef = this._fuseConfirmationService.open(this.configForm.value);

      // Subscribe to afterClosed from the dialog reference
      dialogRef.afterClosed().subscribe((result) =>
      {
          console.log(result);
          if(result === 'confirmed') {
            this._appService.delete(app.id).subscribe(() => {
              this.getApps();
            });
          }
      });
  }

  // get data from api
  getApps() {
    const query = {
      pageNumber: this.pageNumber + 1,
      pageSize: this.pageSize
    };
    this.apps$ = this._appService.getAll(query).pipe(
      map((data: any) => {
          const apps: any[] = data.items.map((app, index: number) => ({
              ...app,
              stt: index + 1
          }));
          this.totalItems = data.count;
          return { apps };
      })
    );
  }

  onPageChange(event): void {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getApps();
  }

  addAppAdmin(app) {
    this.drawerComponent = 'add-user-to-app';
    this.addDrawer.open();
    this.selectedData = app;
    this.addUserType = 'add-appadmin';
  }

  addMember(app) {
    this.drawerComponent = 'add-user-to-app';
    this.addDrawer.open();
    this.selectedData = app;
    this.addUserType = 'add-member'

  }
}
