import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

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
  
  /**
   *
   */
  constructor(private _formBuilder: UntypedFormBuilder,) {
    this.editGroupForm = this._formBuilder.group({
      name: ['', Validators.required],
      code: [''],
      description: ['']
    });    
  }

  ngOnInit(): void {
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
  
}
