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
import { NewRoleComponent } from './new-role/new-role.component';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-role',
  standalone: true,
  templateUrl: './role.component.html',
  styles: [
    /* language=SCSS */
    `
        .role-grid {
            grid-template-columns: 48px auto 40px;

            @screen sm {
                grid-template-columns: 48px auto 112px 72px;
            }

            @screen md {
                grid-template-columns: 48px auto 112px 72px;
            }

            @screen lg {
                grid-template-columns: 48px 100px auto 96px;
            }
        }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  imports: [MatIconModule, RouterLink, MatButtonModule, CdkScrollable, NgIf,
    AsyncPipe, NgForOf, CurrencyPipe, MatButtonModule, MatMenuModule,
    FuseDrawerComponent, MatDividerModule, MatSidenavModule, NewRoleComponent,
    EditRoleComponent],
})
export class RoleComponent {

  @ViewChild('addDrawer', { static: false }) addDrawer: FuseDrawerComponent;
  public rolesData: any[] = [
    {
      stt: '1',
      id: '1',
      code: 'VT-001',
      description: 'Nhà cái',
    },
    {
      stt: '2',
      id: '2',
      code: 'VT-002',
      description: 'Quay số',
    },
  ];

  public roles$: Observable<any[]> = new Observable(observer => {
    observer.next(this.rolesData);
    observer.complete();
  });

  drawerComponent: 'new-role' | 'edit-role';
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
          title      : 'Xóa vai trò',
          message    : 'Xóa vai trò này khỏi hệ thống? <span class="font-medium">Thao tác này không thể hoàn tác!</span>',
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

  addRole() {
    this.drawerComponent = 'new-role';
    this.addDrawer.open();
  }

  closeDrawer() {
    this.addDrawer.close();
  }

  editRole(role: any) {
    console.log(role);
    this.drawerComponent = 'edit-role';
    this.addDrawer.open();
  }

  deleteRole(role: any) {
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
