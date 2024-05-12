import { CdkScrollable } from '@angular/cdk/scrolling';
import { AsyncPipe, CurrencyPipe, NgForOf, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { FuseDrawerComponent } from '@fuse/components/drawer';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { NewUserComponent } from './new-user/new-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { UserApiService } from 'app/services/user.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { isAllowCRUD } from 'app/mock-api/common/user/roleHelper'
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  encapsulation: ViewEncapsulation.None,
  imports: [MatIconModule, RouterLink, MatButtonModule, CdkScrollable, NgIf,
    AsyncPipe, NgForOf, CurrencyPipe, MatButtonModule, MatMenuModule,
    FuseDrawerComponent, MatDividerModule, MatSidenavModule, NewUserComponent,
    EditUserComponent, MatPaginatorModule],
})
export class UserComponent {

  @ViewChild('addDrawer', { static: false }) addDrawer: MatDrawer;
  @ViewChild('paginator') paginator: MatPaginator;


  public users$;

  drawerComponent: 'new-user' | 'edit-user';
  configForm: UntypedFormGroup;
  selectedData: any;
  pageSize = 25; // Initial page size
  pageNumber = 0; // Initial page index
  totalItems = 0; // Total items

  userInfo = {
    role: localStorage.getItem('role'),
    tenantId: localStorage.getItem('tenantId'),
    userId: localStorage.getItem('userId')
  }

  drawerMode: 'side' | 'over';
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(private _fuseConfirmationService: FuseConfirmationService,
    private _formBuilder: UntypedFormBuilder,
    private _userService: UserApiService,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _changeDetectorRef: ChangeDetectorRef,

  ) {
  }

  ngOnInit(): void {
    this.getUsers();

    // Build the config form
    this.configForm = this._formBuilder.group({
      title: 'Xóa thành viên',
      message: 'Xóa thành viên này khỏi hệ thống? <span class="font-medium">Thao tác này không thể hoàn tác!</span>',
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

            // Subscribe to media changes
            this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) =>
            {
                // Set the drawerMode if the given breakpoint is active
                if ( matchingAliases.includes('lg') )
                {
                    this.drawerMode = 'over';
                }
                else
                {
                    this.drawerMode = 'over';
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
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
    this.selectedData = user;

    this.addDrawer.open();
  }

  deleteUser(user: any) {
    this.openConfirmationDialog();
  }

  openConfirmationDialog(): void {
    // Open the dialog and save the reference of it
    const dialogRef = this._fuseConfirmationService.open(this.configForm.value);

    // Subscribe to afterClosed from the dialog reference
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result === 'confirmed') {
        console.log('Delete');
      }
    });
  }

  // get data from api
  getUsers() {
    const query = {
      pageNumber: this.pageNumber + 1,
      pageSize: this.pageSize
    };
    this.users$ = this._userService.getListUser(query).pipe(
      map((data: any) => {
        const users: any[] = data.items.map((user, index: number) => ({
          ...user,
          stt: index + 1
        }));
        this.totalItems = data.count;
        return { users };
      })
    );
  }

  onPageChange(event): void {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getUsers();
  }

  // we need this function to distroy the child component when drawer is closed
  drawerOpenedChanged(isOpened) {
    console.log(isOpened);
    if (!isOpened) {
      this.drawerComponent = null;
    }
  }

  isAllowCRUD() {
    return isAllowCRUD(this.userInfo.role);
  }
}
