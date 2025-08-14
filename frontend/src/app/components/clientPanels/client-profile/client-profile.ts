import {Component, OnInit} from '@angular/core';
import userService from '../../../services/UserService';
import purchaseService from '../../../services/PurchaseService';
import {purchasedProduct,Purchase} from '../../../models/Purchase'

@Component({
  selector: 'app-client-profile',
  imports: [

  ],
  templateUrl: './client-profile.html',
  styleUrl: './client-profile.css'
})
export default class ClientProfile implements OnInit {


  constructor(private userService: userService,private  purchaseService: purchaseService) {
  }

  currentUser: any = null;
  error = '';
  isLoading = false;
  purchaseLog: Purchase[] = [];

  ngOnInit() {
    this.loadUserProfile();

  }

  loadUserProfile() {

    this.currentUser = this.userService.getCurrentUser();
    console.log('📋 Showing cached user data:', this.currentUser);

    if (this.currentUser?.id) {
      this.loadPurchaseLog();
    }


    this.fetchFreshProfile();

  }
  loadPurchaseLog() {
    this.error = '';
    this.purchaseService.getPurchasesByUserId(this.currentUser.id).subscribe({
      next:(purchaseData) => {
        this.purchaseLog = purchaseData;

      },error: (error:any) => {
        this.error = error;
      }
    })

  }

  fetchFreshProfile() {
    this.isLoading = true;
    this.error = '';

    this.userService.getProfile().subscribe({
      next: (response: any) => {
        console.log('🔄 Fresh profile data received:', response);


        if (response.user) {
          this.currentUser = response.user;
        } else {
          this.currentUser = response;
        }

        this.isLoading = false;
      },
      error: (error) => {
        console.error('❌ Failed to fetch fresh profile:', error);
        this.error = 'Failed to load latest profile data';
        this.isLoading = false;


        if (!this.currentUser) {
          this.currentUser = this.userService.getCurrentUser();
        }
      }
    });
  }


}


