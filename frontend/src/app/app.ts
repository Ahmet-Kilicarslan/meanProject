
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import SidebarComponent from './components/sidebar/sidebar.component';
import HeaderComponent from './components/header/header.component';


@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet, HeaderComponent,SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('front');

  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
