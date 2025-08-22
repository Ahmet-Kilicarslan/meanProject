import {Component, EventEmitter, OnChanges, OnInit, Output, Input, SimpleChanges} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import userService from '../../../services/UserService';
import {firstValueFrom, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../../../models/User';

@Component({
  selector: 'app-client-profile-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './client-profile-edit.html',
  styleUrl: './client-profile-edit.css'
})
export default class ClientProfileEdit implements OnInit, OnChanges {

  constructor(private userService: userService) {
  }

  @Input() userData: any;
  @Input() isVisible: boolean = false;

  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();


  User = {
    id: null,
    username: '',
    email: '',
    newPassword: '',
    oldPassword: '',
  };

  isLoading = false;
  showPasswordFields = false;
  showNewPassword = false;
  showOldPassword = false;
  error = '';

  ngOnInit() {
    this.resetForm()

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userData']) {
      this.resetForm();

    }
  }


  resetForm() {
    if (this.userData) {
      this.User = {
        id: this.userData.id,
        username: this.userData.username,
        email: this.userData.email,
        newPassword: '',
        oldPassword: ''
      };
    }

    this.showOldPassword = false;
    this.showNewPassword = false;
    this.showPasswordFields = false;
    this.error = '';

  }


  onSubmit() {

    if (!this.validateForm()) {
      return;
    }
    const form = document.querySelector('.needs-validation') as HTMLFormElement;
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }
    const updateData: any = {
      id: this.User.id,
      username: this.User.username,
      email: this.User.email
    };


    if(this.showPasswordFields) {
      updateData.oldPassword = this.User.oldPassword;
      updateData.newPassword = this.User.newPassword;
    }

    console.log('Emitting update data:', updateData);

    this.onSave.emit(updateData);
  }

  onCancelClicked() {
    this.resetForm();
    this.onCancel.emit()
  }

  async validateForm(): Promise<boolean> {
    this.error = '';
    const isDuplicate = await firstValueFrom(//converts observable to promise
      this.checkForDuplicateUsername(this.userData.username)
    );
    if (isDuplicate) {
      this.error = 'This username already exists';
      return false;
    }
    if (!this.User.username) {
      this.error = 'Username is required';
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.User.email)) {
      this.error = 'Valid email is required';
      return false;
    }
    /*if (this.showPasswordFields) {
      if (!this.User.oldPassword.trim()) {
        this.error = 'Old password is required';
        return false;

      }
      if (!this.User.newPassword.trim()) {
        this.error = 'New password is required';
        return false;
      }

      if (this.User.newPassword.length < 6) {
        this.error = 'New password must be at least 6 characters long';
        return false;

      }
      if (this.User.newPassword === this.User.oldPassword) {
        this.error = 'new password cant be same with old password';
        return false;
      }
    }*/
    return true;

  }

  toggleOldPasswordVisibility() {
    this.showOldPassword = !this.showOldPassword;
  }

  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }

  togglePasswordChange() {
    this.showPasswordFields = !this.showPasswordFields;
    if (!this.showPasswordFields) {
      this.User.newPassword = '';
      this.showNewPassword = false;
    }
  }

  checkForDuplicateUsername(username: string): Observable<boolean> {
    return this.userService.getAllUsers().pipe(
      map((users: User[]) =>
        users.some(user =>//some() return true if an array element matches input
          user.username.toLowerCase() === username.toLowerCase() &&
          this.User.id !== user.id)
      )
    );
  }

}
