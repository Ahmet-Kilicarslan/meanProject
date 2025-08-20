import {Component, signal, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import SidebarComponent from './components/sidebar/sidebar.component';
import HeaderComponent from './components/header/header.component';
import userService from './services/UserService';
import {filter} from 'rxjs/operators';
import ClientHeader from './components/client-header/client-header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, ClientHeader],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export default class App implements OnInit {

  protected readonly title = signal('front');

  isCollapsed = false;
  isLoginPage = false;
  isAdmin = false;
  isClient = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  constructor(private router: Router, private userService: userService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      console.log('🔄 Navigation to:', event.url);
      this.isLoginPage = event.url === '/login';
      console.log('📊 App state - isLoginPage:', this.isLoginPage, 'isAdmin:', this.isAdmin, 'isClient:', this.isClient);
      this.updateUserRoles();
    });
  }

  ngOnInit() {

    this.updateUserRoles();
    this.isLoginPage = this.router.url === '/login';

    this.userService.checkAuthStatus().subscribe({
      next: () => {

        this.updateUserRoles();
        console.log('✅ Auth status checked on app init');
      },
      error: (error) => {

        console.log('❌ Auth check failed on app init - redirecting to login');
        console.error('Auth check failed:', error);
        this.router.navigate(['/login']);
      }
    });
  }

  private updateUserRoles() {
    const user = this.userService.getCurrentUser();

    if (user && this.userService.isAuthenticated()) {

      this.isAdmin = this.userService.isAdmin();

      this.isClient = this.userService.isClient();

      console.log('🔄 Roles updated - isAdmin:', this.isAdmin, 'isClient:', this.isClient);
    } else {

      this.isAdmin = false;

      this.isClient = false;

      console.log('🔄 Roles updated - isAdmin:', this.isAdmin, 'isClient:', this.isClient)
    }
  }
}
