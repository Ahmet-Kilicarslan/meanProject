import {Component,EventEmitter,Output} from '@angular/core';
import {RouterModule} from '@angular/router';
import userService from '../../services/UserService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar' ,
  standalone:true,
  imports:[RouterModule],
  templateUrl:'./sidebar.component.html',
  styleUrls:['./sidebar.component.css']
})
export default class SidebarComponent {
  @Output() toggle = new EventEmitter<void>();

  toggleSidebar() {
    this.toggle.emit();
}

logoutLoading=false;
logoutError='';

constructor(private userService: userService, private router: Router) {}
/*we destroy session in route which we reached through service */

  handleLogout(){
    this.logoutLoading = true;
    this.userService.logout().subscribe({
      next: ()=>{
        this.router.navigate(['/login']).then(() => {
          console.log('Navigation successful');
        }).catch((error) => {
          console.error('Navigation failed:', error);
        });

      },error:(err)=>{
        this.logoutError = 'logoutError';
        console.log(err);

      },complete:()=>{
        this.logoutLoading = false;
      }
    })



}
  clearError(): void {
    this.logoutError = '';
  }



}
