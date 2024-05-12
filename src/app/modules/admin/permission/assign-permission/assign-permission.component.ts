import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-assign-permission',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatSlideToggleModule, MatButtonModule],
  templateUrl: './assign-permission.component.html',
})
export class AssignPermissionComponent {
  @Output() onClosed = new EventEmitter<any>();
  @Input() data: any = {};

  notificationsForm: UntypedFormGroup;

  /**
   * Constructor
   */
  constructor(
      private _formBuilder: UntypedFormBuilder,
  )
  {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void
  {
      // Create the form
      this.notificationsForm = this._formBuilder.group({
          communication: [true],
          security     : [true],
          meetups      : [false],
          comments     : [false],
          mention      : [true],
          follow       : [true],
          inquiry      : [true],
      });
  }
}
