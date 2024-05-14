import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import { UserService } from 'app/core/user/user.service';
import { UserApiService } from 'app/services/user.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-manager',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatButtonModule, MatIconModule, NgIf, NgFor, MatDividerModule,
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatListModule, MatAutocompleteModule],
  templateUrl: './add-manager.component.html',
})
export class AddManagerComponent {
  @Input() drawer: MatDrawer;
  @Output() onClosed = new EventEmitter<any>();
  @Input() data: any = {};

  addManagerForm: UntypedFormGroup;
  listManager = [];
  filteredOptions:any;
  folders: any[] = [
    {
      name: 'Photos',
    },
    {
      name: 'Recipes',
    },
    {
      name: 'Work',
    },
  ];
  /**
   *
   */
  constructor(private _formBuilder: UntypedFormBuilder,
              private _userService: UserApiService,
              private _snackBar: MatSnackBar,
  ) {
    this.addManagerForm = this._formBuilder.group({
      fullName: [''],
      searchManager: ['']
    });
  }

  ngOnInit() {
    console.log(this.data);
    this.getUserById();
    this.addManagerForm.patchValue(this.data);
  }

  // get user by id 
  getUserById() {
    this._userService.get(this.data.id).subscribe(res => {
      this.listManager = res.managers;
      console.log(this.listManager);
    })
  }
  save() {
    console.log(this.listManager);
    // get list id from listManager
    const listIds = this.listManager.map(manager => manager.id);
    console.log(listIds);

    let model = {
      managerIds: listIds,
      isActive: this.data.isActive
    }
    this._userService.update(this.data.id, model).subscribe(
      (res) => {
        this.openSnackBar('Thao tác thành công', 'Đóng');
        this.onClosed.emit();
        this.drawer.close();
      },
      (error) => {
        // Handle error if observable emits an error
        console.error('Error:', error);
        // You can also display an error message to the user if needed
        this.openSnackBar('Có lỗi xảy ra khi thực hiện thao tác', 'Đóng');
      }
    );

  }

  // close drawer and reset form
  cancelEdit(): void {
    this.drawer.close();
  }

  searchUser() {
    var query = {
      userName: this.addManagerForm.value.searchManager
    }
    this.filteredOptions = this._userService.getByUserName(query);
  }

  onOptionSelected(event: any): void {
    // Check for duplicates before adding
    const selectedManager = event.option.value;
    if (!this.listManager.some(u => u.id == selectedManager.id)) {
      this.listManager.push(selectedManager);
    }
    // clear filteredOptions
    this.filteredOptions = null;
    this.addManagerForm.get('searchManager')!.setValue("");
  }

  removeFromList(user) {
    const index = this.listManager.indexOf(user);
    if (index !== -1) {
      this.listManager.splice(index, 1);
    }
  }

    // snackbar
    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, { duration: 2000 });
    }
}
