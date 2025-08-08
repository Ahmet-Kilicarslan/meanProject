import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, GuardResult, MaybeAsync, Router, RouterStateSnapshot} from '@angular/router';
import userService from '../services/UserService';
import {filter, map} from 'rxjs/operators';
import {CanActivate} from '@angular/router';
import {take} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export default class adminGuard implements CanActivate {
  constructor(private router: Router, private userService: userService) {
  }

  canActivate(): any {
    if (this.userService.isAuthenticated() && this.userService.isAdmin()) {
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


