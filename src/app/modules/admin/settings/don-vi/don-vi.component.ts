import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TextFieldModule } from '@angular/cdk/text-field';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TenantService } from 'app/services/tenant.service';

@Component({
  selector: 'app-don-vi',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatIconModule, MatInputModule, TextFieldModule, MatSelectModule, MatOptionModule, MatButtonModule],
  templateUrl: './don-vi.component.html',
})
export class DonViComponent {
  accountForm: UntypedFormGroup;
  @Output() onClosed = new EventEmitter<any>();
  @Input() data: any = {};

  tenantId = localStorage.getItem('tenantId');
  /**
   * Constructor
   */
  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _snackBar: MatSnackBar,
    private _tenantService: TenantService
  ) {
    // Create the form
    this.accountForm = this._formBuilder.group({
      name: [''],
      description: [''],
      code: [''],
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.getCoQuanInfo();

  }

  // snackbar
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2000 });
  }

  getCoQuanInfo() {
    this._tenantService.get(this.tenantId).subscribe((res) => {
      this.accountForm.patchValue(res);
    });
  }
}
