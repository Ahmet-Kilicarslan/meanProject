import {Component,EventEmitter,Output} from '@angular/core';
import {RouterModule} from '@angular/router';


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


}
