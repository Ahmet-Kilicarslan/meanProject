import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, GuardResult, MaybeAsync, Router, RouterStateSnapshot} from '@angular/router';
import userService from '../services/UserService';
import {catchError, filter, map} from 'rxjs/operators';
import {CanActivate} from '@angular/router';
import {of, take,Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export default class adminGuard implements CanActivate {
  constructor(private router: Router, private userService: userService) {
  }

  canActivate(): Observable<boolean> {
    return this.userService.getProfile().pipe(

      map((response:any)=>{
        if(response?.user?.role === 'admin'){
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


