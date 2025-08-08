import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {loginRequest, registerRequest} from '../../../models/User';
import userService from '../../../services/UserService';

import {Router} from '@angular/router';


@Component({
  selector: 'app-login-component',
  imports: [
    FormsModule
  ],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})
export default class LoginComponent {

  loginData: loginRequest = {
    username: "",
    password: "",
  }

  registerData: registerRequest = {
    username: "",
    password: "",
    email: "",
  }

  loginError = '';
  registerError = '';
  registerSuccess = '';

  isLoginLoading = false;
  isRegisterLoading = false;

  constructor(private userService: userService, private router: Router) {
  }

  private navigateBasedOnRole(role: string): void {
    let route = '';
    if (role === "admin") {
      route = '/Dashboard';


    } else if (role === "user") {
      route = '/clientDashboard';

    }else {

      console.error('❌ Unknown user role:', role);
      route = '/login';
    }
    this.router.navigate([route]).then((success:boolean) => {
      if (success) {
        console.log('✅ login successful');
      } else {
        console.log('❌ login failed');
      }}).catch((error:any) => {
      console.error('❌ Navigation error:', error);
    });
  }

  handleLogin(): void {
    console.log('🔍 DEBUGGING: loginData object:', this.loginData);
    console.log('🔍 DEBUGGING: loginData keys:', Object.keys(this.loginData));
    console.log('🔍 DEBUGGING: username value:', this.loginData.username);
    console.log('🔍 DEBUGGING: password value:', this.loginData.password);
    this.isLoginLoading = true;
    this.loginError = '';//clear error

    if (!this.validateLogin()) {
      return;
    }

    this.userService.login(this.loginData).subscribe({
        next: (response) => {
          console.log('Login successful, user role:', response.user.role);

          this.navigateBasedOnRole(response.user.role);

        }, error: (error) => {
          this.loginError = 'Login failed. ';
          console.error(this.loginError, error);


        }, complete: () => {
          console.log('login response complete');
          this.isLoginLoading = false;


        }
      }
    )
  }


  handleRegister() {
    this.registerError = '';
    this.isRegisterLoading = true;

    if (!this.validateRegister()) {
      return;

    }

    this.userService.register(this.registerData).subscribe({
      next: (response) => {
        console.log('✅ Registration successful:', response);
        this.registerSuccess = 'Registration successful! You can now login.';
        this.switchToLoginTab();
        this.registerData = {
          username: '',
          password: '',
          email: ''
        }

      }, error: (error) => {
        this.loginError = 'Register failed. ';
        console.error(this.loginError, error);

      }, complete: () => {
        console.log('register response complete');
        this.isRegisterLoading = false;


      }
    })


  }

  private validateLogin(): boolean {
    if (!this.loginData.username.trim()) {
      this.loginError = 'Username is required';
      this.isLoginLoading = false; // Add this
      return false;
    }
    if (!this.loginData.password.trim()) {
      this.loginError = 'Password is required';
      this.isLoginLoading = false; // Add this
      return false;
    }
    if (this.loginData.password.length < 6) {
      this.loginError = 'Password must be at least 6 characters';
      this.isLoginLoading = false; // Add this
      return false;
    }
    return true;
  }

  private validateRegister(): boolean {
    if (!this.registerData.username.trim()) {
      this.registerError = 'Username is required';
      this.isRegisterLoading = false; // Add this
      return false;
    }
    if (!this.registerData.password.trim()) {
      this.registerError = 'Password is required';
      this.isRegisterLoading = false; // Add this
      return false;
    }
    if (this.registerData.password.length < 6) {
      this.registerError = 'Password must be at least 6 characters';
      this.isRegisterLoading = false; // Add this
      return false; // You're missing this return!
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.registerData.email.trim())) {
      this.registerError = 'Valid Email is required';
      this.isRegisterLoading = false; // Add this
      return false;
    }
    return true;
  }


  private switchToLoginTab(): void {
    // Use correct IDs from your HTML
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginPane = document.getElementById('login-panel');
    const registerPane = document.getElementById('register-panel');

    if (loginTab && registerTab && loginPane && registerPane) {
      // Switch tab appearance
      loginTab.classList.add('active');
      registerTab.classList.remove('active');


      // Switch pane visibility
      loginPane.classList.add('show', 'active');
      registerPane.classList.remove('show', 'active');
    }
  }


}







