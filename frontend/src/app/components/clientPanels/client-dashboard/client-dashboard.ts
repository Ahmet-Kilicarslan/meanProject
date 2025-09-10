import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/User';
import UserService from '../../../services/UserService';
import PurchaseService from '../../../services/PurchaseService';

@Component({
  selector: 'app-client-dashboard',
  imports: [],
  templateUrl: './client-dashboard.html',
  styleUrl: './client-dashboard.css'
})
export default class ClientDashboard implements OnInit {


  ngOnInit() {
   this.loadUser();
   this.getTotalOrders()
  }

  constructor(
    private userService: UserService,
    private purchaseService: PurchaseService,
  ) {}

  currentUser: any=null;
  orderCount:number = 0;
  totalSpent:number = 0;



  fetchProfile(){
    this.userService.getProfile().subscribe({
      next:(user: User) => {
        this.currentUser = user;
        console.log("anan",this.currentUser.username);

      },error:(error) => {
        console.log(error);

      }
      }
    )
  }

  loadUser(){
    this.currentUser =  this.userService.getCurrentUser();

    if(!this.currentUser){
      this.fetchProfile();
    }
  }

  getTotalOrders():void{
    this.purchaseService.getPurchasesByUserIdInAscendingOrder(this.currentUser.id).subscribe({
      next:(purchases )=>{

        this.orderCount = purchases.length;
        for(const purchase of purchases){

          this.totalSpent += purchase.totalAmount;
        }

      },error:(error) => {
        console.log(error);
      }
    })

  }


}
