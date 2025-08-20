import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import userService from '../services/UserService';
import { map ,tap,catchError} from 'rxjs/operators';
import { CanActivate } from '@angular/router';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export default  class authGuard implements CanActivate {


  constructor(private router: Router, private userService: userService) { }

  canActivate(): Observable <boolean>{
   return this.userService.checkAuthStatus().pipe(
     map((response : any)=>{
       if(response.isAuthenticated){
         return true;

       } else {
         this.router.navigate(['/login']);
         return false;
       }
     }),catchError((error) => {
       // If request fails, redirect to login
       console.error('Auth check failed:', error);
       this.router.navigate(['/login']);
       return of(false); // Return observable of false
     })
   )








  }
}
