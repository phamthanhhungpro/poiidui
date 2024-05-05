import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TenantService } from 'app/services/tenant.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Task } from 'app/model/checkbox.model';
import { AppService } from 'app/services/app.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-tenant',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, NgIf, NgFor, MatDividerModule,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatFormFieldModule,
    MatCheckboxModule
  ],
  templateUrl: './new-tenant.component.html'
})
export class NewTenantComponent {
  @Input() drawer: MatDrawer;
  @Output() onClosed = new EventEmitter<any>();
  addTenantForm: UntypedFormGroup;
  appCheckbox: Task = {
    name: 'Chọn tất cả',
    completed: false,
    color: 'primary',
    subtasks: [
    ],
  };
  /**
   *
   */
  constructor(private _formBuilder: UntypedFormBuilder,
              private _tenantService: TenantService,
              private _appService: AppService,
              private _snackBar: MatSnackBar,
              private changeDetector: ChangeDetectorRef,
  ) {
    this.addTenantForm = this._formBuilder.group({
      name: ['', Validators.required],
      code: [''],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.getApps();
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
  // clear form when close drawer
  clearForm(): void {
    this.addTenantForm.reset();
  }

  // close drawer and reset form
  cancelAdd(): void {
    this.drawer.close();
    this.clearForm();
    this.uncheckAll();
  }

  // save data
  save(): void {
    var selectedApps = this.appCheckbox.subtasks.filter(t => t.completed).map(t => t.value);
    this.addTenantForm.value.appIds = selectedApps;
    this._tenantService.create(this.addTenantForm.value).subscribe(res => {
      if(res.isSucceeded) {
        this.openSnackBar('Thao tác thành công', 'Đóng');
        this.onClosed.emit();
        this.drawer.close();
        this.clearForm();
      } else {
        this.openSnackBar('Thao tác thất bại', 'Đóng');
      }
    });
  }

  // checkbox handle
  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.appCheckbox.subtasks != null && this.appCheckbox.subtasks.length !== 0 && this.appCheckbox.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.appCheckbox.subtasks == null || this.appCheckbox.subtasks.length === 0) {
      return false;
    }

    if (this.appCheckbox.subtasks.filter(t => t.completed).length === this.appCheckbox.subtasks.length) {
      this.allComplete = true;
    }
    return this.appCheckbox.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }


  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.appCheckbox.subtasks == null || this.appCheckbox.subtasks.length === 0) {
      return;
    }
    this.appCheckbox.subtasks.forEach(t => (t.completed = completed));
  }

  uncheckAll() {
    this.allComplete = false;
    this.appCheckbox.completed = false;
    this.appCheckbox.subtasks.forEach(t => (t.completed = false));
  }

  // get list app to populate checkbox
  getApps(): void {
    this._appService.getAllNoPaging().subscribe(res => {
      this.appCheckbox.subtasks = res.map(item => {
        return {name: item.name, completed: false, color: 'primary', value: item.id};
      });
    });
  }

  // snackbar
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {duration: 2000});
  }
}
