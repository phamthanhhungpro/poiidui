import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-role',
  standalone: true,
  imports        : [MatButtonModule, MatIconModule, NgIf, NgFor, MatDividerModule,
                    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatFormFieldModule,
  ],
  templateUrl: './edit-role.component.html'
})
export class EditRoleComponent {
  @Input() drawer: MatDrawer;
  editRoleForm: UntypedFormGroup;
  
  /**
   *
   */
  constructor(private _formBuilder: UntypedFormBuilder,) {
    this.editRoleForm = this._formBuilder.group({
      code: ['', Validators.required],
      description: ['']
    });    
  }

  ngOnInit(): void {
  }
  
  // clear form when close drawer
  clearForm(): void {
    this.editRoleForm.reset();
  }

  // close drawer and reset form
  cancelEdit(): void {
    this.drawer.close();
    this.clearForm();
  }
  
}
