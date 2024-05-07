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
import { MatSidenavModule } from '@angular/material/sidenav';
import { NewRoleComponent } from './new-role/new-role.component';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { RoleService } from 'app/services/role.service';

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
                grid-template-columns:  auto 48px 112px 72px;
            }

            @screen md {
                grid-template-columns: 48px 150px 80px auto 96px;
            }

            @screen lg {
                grid-template-columns: 48px 150px 80px auto 96px;
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

  public roles$;
  selectedData: any;

  drawerComponent: 'new-role' | 'edit-role';
  configForm: UntypedFormGroup;
  pageSize = 10; // Initial page size
  pageNumber = 0; // Initial page index
  totalItems = 0; // Total items
  /**
   * Constructor
   */
  constructor(private _fuseConfirmationService: FuseConfirmationService,
    private _formBuilder: UntypedFormBuilder,
    private _roleService: RoleService
  ) {
  }

  ngOnInit(): void {
    // Build the config form
    this.configForm = this._formBuilder.group({
      title: 'Xóa vai trò',
      message: 'Xóa vai trò này khỏi hệ thống? <span class="font-medium">Thao tác này không thể hoàn tác!</span>',
      icon: this._formBuilder.group({
        show: true,
        name: 'heroicons_outline:exclamation-triangle',
        color: 'warn',
      }),
      actions: this._formBuilder.group({
        confirm: this._formBuilder.group({
          show: true,
          label: 'Remove',
          color: 'warn',
        }),
        cancel: this._formBuilder.group({
          show: true,
          label: 'Cancel',
        }),
      }),
      dismissible: true,
    });

    this.getRoles();
  }

  addRole() {
    this.drawerComponent = 'new-role';
    this.addDrawer.open();
  }

  closeDrawer() {
    this.addDrawer.close();
  }

  editRole(role: any) {
    this.selectedData = role;
    this.drawerComponent = 'edit-role';
    this.addDrawer.open();
  }

  deleteRole(role: any) {
    const dialogRef = this._fuseConfirmationService.open(this.configForm.value);

    // Subscribe to afterClosed from the dialog reference
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirmed') {
        this._roleService.delete(role.id).subscribe(() => {
          this.getRoles();
        });
      }
    });
  }


  // get data from api
  getRoles() {
    const query = {
      pageNumber: this.pageNumber + 1,
      pageSize: this.pageSize
    };
    this.roles$ = this._roleService.getAll(query).pipe(
      map((data: any) => {
        const roles: any[] = data.items.map((role, index: number) => ({
          ...role,
          stt: index + 1
        }));
        this.totalItems = data.count;
        return { roles };
      })
    );
  }

  // we need this function to distroy the child component when drawer is closed
  drawerOpenedChanged(isOpened) {
    if (!isOpened) {
      this.drawerComponent = null;
    }
  }
  // onPageChange(event): void {
  //   this.pageNumber = event.pageIndex;
  //   this.pageSize = event.pageSize;
  //   this.getRoles();
  // }
}
