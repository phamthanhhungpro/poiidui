import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UserApiService } from 'app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSlideToggleModule, MatButtonModule],
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent {
  securityForm: UntypedFormGroup;

  /**
   * Constructor
   */
  constructor(
      private _formBuilder: UntypedFormBuilder,
      private _userApiService: UserApiService,
      private _matSnackBar: MatSnackBar,
      private _router: Router,
      private _authService: AuthService
  )
  {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void
  {
      // Create the form
      this.securityForm = this._formBuilder.group({
          userId         : [''],
          oldPassword  : [''],
          newPassword      : ['']
      });
  }

  onSave(): void {
    // Do something
    this.securityForm.value.userId = localStorage.getItem('userId');
    this._userApiService.changePwd(this.securityForm.value).subscribe(() => {
      this.openSnackBar('Thay đổi mật khẩu thành công', 'OK');
      this._authService.signOut();
      this._router.navigate(['/sign-in']);
    });
  }

  onCancel(): void {
    this.securityForm.reset();
  }

  openSnackBar(message: string, action: string): void {
    this._matSnackBar.open(message, action, {
      duration: 2000,
    });
  }
}
