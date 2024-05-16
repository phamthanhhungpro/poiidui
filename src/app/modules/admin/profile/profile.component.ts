import { Component } from '@angular/core';
import { AsyncPipe, CommonModule, NgClass, NgFor, NgForOf, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { AssignPermissionComponent } from '../permission/assign-permission/assign-permission.component';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UserApiService } from 'app/services/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, NgIf, NgFor, MatDividerModule,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,CdkScrollable, MatTabsModule],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  userInfo = {
    role: localStorage.getItem('role'),
    tenantId: localStorage.getItem('tenantId'),
    userId: localStorage.getItem('userId')
  };

  profileForm: UntypedFormGroup;
  changePassForm: UntypedFormGroup;
  /**
   *
   */
  constructor(private _formBuilder: UntypedFormBuilder,
    private _userService: UserApiService) {
    this.profileForm = this._formBuilder.group({
      surName: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],
      phone: [''],
      tenantName: ['', Validators.required],
      roleName: ['', Validators.required],
    });

    this.changePassForm = this._formBuilder.group({
      newPass: ['', Validators.required],
      reNewPass: ['', Validators.required]
    });

  }
  selectedFile: File | null = null;
  selectedFileURL: string | ArrayBuffer | null = null;
  avatarUrl: any = "";

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    // Display the selected image preview
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedFileURL = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
    this.uploadImage();
  }

  uploadImage() {
    if (this.selectedFile) {
      this._userService.uploadAvatar(this.selectedFile)
        .subscribe(res => {
          // Handle response, e.g., update user profile with new avatar URL
          this.avatarUrl = res.avatarUrl;
        }, error => {
          console.error("Failed to upload avatar:", error);
        });
    }
  }

  save() {

  }
}
