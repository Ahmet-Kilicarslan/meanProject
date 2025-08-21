import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import userService from '../../services/UserService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-client-header',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './client-header.html',
  styleUrls: ['./client-header.css']
})
export default class ClientHeader {
  logoutLoading = false;
  logoutError = '';

  constructor(private userService: userService, private router: Router) {
  }

  handleClientLogout() {
    this.logoutLoading = true;
    this.userService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']).then(() => {
          console.log('logout successful');
        }).catch((error) => {
          console.error('logout failed:', error);
        });

      }, error: (err) => {
        this.logoutError = 'logoutError';
        console.log(err);

      }, complete: () => {
        this.logoutLoading = false;
      }
    })

  }

  testClick() {
    console.log('🔄 Navbar toggler clicked!');
  }
}
