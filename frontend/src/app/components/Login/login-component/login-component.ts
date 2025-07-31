import { Component } from '@angular/core';
import{FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login-component',
  imports: [
    FormsModule
  ],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})
export default class LoginComponent {

  loginData={
    username:"",
    password:"",
  }

  registerData={
    username:"",
    password:"",
    email:"",
  }


  handleLogin() {}


  login(){

  }

  handleRegister() {

  }
  register() {

  }

}





