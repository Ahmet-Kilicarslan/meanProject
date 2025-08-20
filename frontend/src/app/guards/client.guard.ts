import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import userService from '../services/UserService';
import {filter, map, tap,catchError} from 'rxjs/operators';
import { CanActivate } from '@angular/router';
import {Observable, of} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export default class clientGuard implements CanActivate {
  constructor(private router: Router, private userService: userService) {
  }

  canActivate(): Observable<boolean> {
return this.userService.getProfile().pipe(

  map((response:any)=>{
  if(response?.user?.role === 'user'){
    return true;
  }
  else {
    this.router.navigate(['/login']);
    return false;
  }

  }),catchError((error:any)=>{

    console.error('Auth check failed:', error);
    this.router.navigate(['/login']);
    return of(false); // Return observable of false
  })
)


  }
}
