import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { FeedbackService } from 'app/services/feeback.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent {
  feedbackForm: FormGroup;

  constructor(private fb: FormBuilder,
    private _feedbackService: FeedbackService,
    private _snackBar: MatSnackBar) {
    this.feedbackForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      apptype: ['', Validators.required],
      screenshots: [null]
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      console.log(files);
      this.feedbackForm.patchValue({
        screenshots: files
      });
    }
  }

  onSubmit() {
    if (this.feedbackForm.valid) {
      const formData = new FormData();
      formData.append('title', this.feedbackForm.get('title')?.value);
      formData.append('description', this.feedbackForm.get('description')?.value);
      formData.append('appName', this.feedbackForm.get('apptype')?.value);

      const files: File[] = this.feedbackForm.get('screenshots')?.value;
      for (let file of files) {
        formData.append('attachments', file, file.name);
      }

      console.log(formData);
      this._feedbackService.create(formData).subscribe((res) => {
        if(res.isSucceeded) {
          this.openSnackBar('Thao tác thành công', 'Đóng');
          this.feedbackForm.reset();
        } else {
          this.openSnackBar('Thao tác thất bại', 'Đóng');
        }      });
    } else {
      console.log('Form is invalid');
    }
  }

  // snackbar
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2000 });
  }
}
