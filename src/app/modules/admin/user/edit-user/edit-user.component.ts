import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  styles: [
    /* language=SCSS */
    `
      .example-section {
        display: flex;
        align-content: center;
        align-items: center;
        height: 60px;
      }
      
      .example-margin {
        margin: 10px;
      }

      .custom-image {
        width: 200px;
      }
    `,
  ],
  imports: [MatButtonModule, MatIconModule, NgIf, NgFor, MatDividerModule,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    MatFormFieldModule, MatCheckboxModule
  ],
  templateUrl: './edit-user.component.html'
})
export class EditUserComponent {
  @Input() drawer: MatDrawer;
  editUserForm: UntypedFormGroup;

  /**
   *
   */
  constructor(private _formBuilder: UntypedFormBuilder,) {
    this.editUserForm = this._formBuilder.group({
      fullname: ['', Validators.required],
      address: [''],
      phone: [''],
      isActive: ['']
    });
  }

  ngOnInit(): void {
  }

  selectedFile: File | null = null;
  selectedFileURL: string | ArrayBuffer | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];

    // Display the selected image preview
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedFileURL = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  uploadImage() {
    if (this.selectedFile) {
      // Perform the upload logic here
      // You can use services or APIs to handle the file upload
      console.log('Uploading file:', this.selectedFile);
    }
  }

  // clear form when close drawer
  clearForm(): void {
    this.editUserForm.reset();
  }

  // close drawer and reset form
  cancelEdit(): void {
    this.drawer.close();
    this.clearForm();
  }

}
