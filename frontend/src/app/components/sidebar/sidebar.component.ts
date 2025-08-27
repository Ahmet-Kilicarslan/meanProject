import {Component, EventEmitter, Output} from '@angular/core';
import {RouterModule} from '@angular/router';
import userService from '../../services/UserService';
import {Router} from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule,NgClass],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export default class SidebarComponent {
  @Output() toggle = new EventEmitter<void>();

  logoutLoading = false;
  isCollapsed = false;
  logoutError = '';

  constructor(private userService: userService, private router: Router) {
  }
  toggleSidebar() {
    this.toggle.emit();
    this.isCollapsed = !this.isCollapsed;
  }

  handleLogout() {
    this.logoutLoading = true;
    this.userService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']).then(() => {
          console.log('Navigation successful');
        }).catch((error) => {
          console.error('Navigation failed:', error);
        });

      }, error: (err) => {
        this.logoutError = 'logoutError';
        console.log(err);

      }, complete: () => {
        this.logoutLoading = false;
      }
    })


  }

  clearError(): void {
    this.logoutError = '';
  }


}
