import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GroupService } from 'app/services/group.service';

@Component({
  selector: 'app-edit-group',
  standalone: true,
  imports        : [MatButtonModule, MatIconModule, NgIf, NgFor, MatDividerModule,
                    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatFormFieldModule,
  ],
  templateUrl: './edit-group.component.html'
})
export class EditGroupComponent {
  @Input() drawer: MatDrawer;
  editGroupForm: UntypedFormGroup;
  @Input() data: any = {};
  @Output() onClosed = new EventEmitter<any>();

  /**
   *
   */
  constructor(private _formBuilder: UntypedFormBuilder,
    private _snackBar: MatSnackBar,
    private _groupService: GroupService,

  ) {
    this.editGroupForm = this._formBuilder.group({
      name: ['', Validators.required],
      code: [''],
      description: ['']
    });    
  }

  ngOnInit(): void {
    this.editGroupForm.patchValue(this.data);
  }
  
  // clear form when close drawer
  clearForm(): void {
    this.editGroupForm.reset();
  }

  // close drawer and reset form
  cancelEdit(): void {
    this.drawer.close();
    this.clearForm();
  }
  
    // save data
    save(): void {
      this._groupService.update(this.data.id, this.editGroupForm.value).subscribe(res => {
        if (res.isSucceeded) {
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
      this._snackBar.open(message, action, { duration: 2000 });
    }
}
