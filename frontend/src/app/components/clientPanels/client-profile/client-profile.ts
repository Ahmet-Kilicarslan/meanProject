import {Component, OnInit} from '@angular/core';
import userService from '../../../services/UserService';


@Component({
  selector: 'app-client-profile',
  imports: [

  ],
  templateUrl: './client-profile.html',
  styleUrl: './client-profile.css'
})
export default class ClientProfile implements OnInit {


  constructor(private userService: userService) {
  }

  currentUser: any = null;
  error = '';
  isLoading = false;


  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    // Show cached data immediately (fast UX)
    this.currentUser = this.userService.getCurrentUser();
    console.log('📋 Showing cached user data:', this.currentUser);

    // Then fetch fresh data from server
    this.fetchFreshProfile();
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
          this.currentUser = response; // In case server sends user data directly
        }

        this.isLoading = false;
      },
      error: (error) => {
        console.error('❌ Failed to fetch fresh profile:', error);
        this.error = 'Failed to load latest profile data';
        this.isLoading = false;

        // Keep showing cached data if server fails
        if (!this.currentUser) {
          this.currentUser = this.userService.getCurrentUser();
        }
      }
    });
  }


}


