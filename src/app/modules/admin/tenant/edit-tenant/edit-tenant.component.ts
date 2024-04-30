import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TenantService } from 'app/services/tenant.service';

@Component({
  selector: 'app-edit-tenant',
  standalone: true,
  imports        : [MatButtonModule, MatIconModule, NgIf, NgFor, MatDividerModule,
                    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatFormFieldModule,
  ],
  templateUrl: './edit-tenant.component.html'
})
export class EditTenantComponent {
  @Input() drawer: MatDrawer;
  editTenantForm: UntypedFormGroup;
  @Input() data: any = {};
  @Output() onClosed = new EventEmitter<any>();

  /**
   *
   */
  constructor(private _formBuilder: UntypedFormBuilder,
              private _tenantService: TenantService
  ) {
    this.editTenantForm = this._formBuilder.group({
      name: ['', Validators.required],
      code: [''],
      description: ['']
    });    
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.editTenantForm.patchValue(this.data);
  }
  
  // clear form when close drawer
  clearForm(): void {
    this.editTenantForm.reset();
  }

  // close drawer and reset form
  cancelEdit(): void {
    this.drawer.close();
    this.clearForm();
  }

  // save data
  save(): void {
    this._tenantService.update(this.data.id, this.editTenantForm.value).subscribe(res => {
      this.onClosed.emit();
      this.drawer.close();
      this.clearForm();
    });
  }
  
}
