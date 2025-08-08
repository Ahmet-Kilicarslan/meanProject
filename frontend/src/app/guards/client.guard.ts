import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import userService from '../services/UserService';
import {filter, map, tap} from 'rxjs/operators';
import { CanActivate } from '@angular/router';
import {take} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export default class clientGuard implements CanActivate {
  constructor(private router: Router, private userService: userService) {
  }

  canActivate(): any {
    if (this.userService.isAuthenticated() && this.userService.isClient()) {
      return true;
    } else {

      this.router.navigate(['/login']).then((success: boolean) => {
        if (success) {
          console.log('✅ back to login');
        } else {
          console.log('❌ navigation failed');
        }
      }).catch((error: any) => {
        console.error('❌ Navigation error:', error);
      });

    }


  }
}
