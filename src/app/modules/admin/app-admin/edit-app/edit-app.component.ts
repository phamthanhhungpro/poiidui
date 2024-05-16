import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AppService } from 'app/services/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-app-admin',
  standalone: true,
  imports        : [MatButtonModule, MatIconModule, NgIf, NgFor, MatDividerModule,
                    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatFormFieldModule,
  ],
  templateUrl: './edit-app.component.html'
})
export class EditAppComponent {
  @Input() drawer: MatDrawer;
  editAppForm: UntypedFormGroup;
  @Input() data: any = {};
  @Output() onClosed = new EventEmitter<any>();
  
  /**
   *
   */
  constructor(private _formBuilder: UntypedFormBuilder,
    private _appService: AppService,
    private _snackBar: MatSnackBar,
    private changeDetector: ChangeDetectorRef,
  ) {
    this.editAppForm = this._formBuilder.group({
      name: ['', Validators.required],
      code: [''],
      description: ['']
    });    
  }

  ngOnInit(): void {
    this.editAppForm.patchValue(this.data);
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
  
  // clear form when close drawer
  clearForm(): void {
    this.editAppForm.reset();
  }

  // close drawer and reset form
  cancelEdit(): void {
    this.drawer.close();
    this.clearForm();
    this.data = null;
  }

  // save data
  save(): void {
    this._appService.update(this.data.id, this.editAppForm.value).subscribe(res => {
      if (res.isSucceeded) {
        // show toast
        this.openSnackBar('Thao tác thành công', 'Đóng');
        this.onClosed.emit();
        this.drawer.close();
        this.clearForm();
      } else {
        this.openSnackBar('Thao tác thất bại', 'Đóng');
      }

    });
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }
}
