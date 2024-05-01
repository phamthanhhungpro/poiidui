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
import { NewUserComponent } from './new-user/new-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styles: [
    /* language=SCSS */
    `
        .user-grid {
            grid-template-columns: 48px auto 40px;

            @screen sm {
                grid-template-columns: 48px auto 112px 72px;
            }

            @screen md {
                grid-template-columns: 48px auto 112px 72px;
            }

            @screen lg {
                grid-template-columns: 48px 80px auto 100px 100px 80px 96px;
            }
        }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  imports: [MatIconModule, RouterLink, MatButtonModule, CdkScrollable, NgIf,
    AsyncPipe, NgForOf, CurrencyPipe, MatButtonModule, MatMenuModule,
    FuseDrawerComponent, MatDividerModule, MatSidenavModule, NewUserComponent,
    EditUserComponent],
})
export class UserComponent {

  @ViewChild('addDrawer', { static: false }) addDrawer: FuseDrawerComponent;
  public usersData: any[] = [
    {
      stt: '1',
      avatar: 'https://th.bing.com/th/id/OIP.M4X4RAU78FzZpPwl54mrgAHaHa?w=188&h=188&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      fullname: 'Phạm Thanh Hùng',
      address: 'Hải Dương',
      phone: '0923992130',
      isActive: true
    },
    {
      stt: '2',
      avatar: 'https://th.bing.com/th/id/OIP.WJPpDDuqrlSvQGPcDwK-NwHaHa?w=191&h=191&c=7&r=0&o=5&dpr=1.3&pid=1.7',
      fullname: 'Nguyễn Ngọc Tiến',
      address: 'Tây Hồ',
      phone: '017238223',
      isActive: false
    },
  ];

  public users$: Observable<any[]> = new Observable(observer => {
    observer.next(this.usersData);
    observer.complete();
  });

  drawerComponent: 'new-user' | 'edit-user';
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
          title      : 'Xóa thành viên',
          message    : 'Xóa thành viên này khỏi hệ thống? <span class="font-medium">Thao tác này không thể hoàn tác!</span>',
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

  addUser() {
    this.drawerComponent = 'new-user';
    this.addDrawer.open();
  }

  closeDrawer() {
    this.addDrawer.close();
  }

  editUser(user: any) {
    console.log(user);
    this.drawerComponent = 'edit-user';
    this.addDrawer.open();
  }

  deleteUser(user: any) {
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
