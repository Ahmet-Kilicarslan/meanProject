import {User, loginRequest, registerRequest, loginResponse} from '../models/User'
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {firstValueFrom, Observable, throwError} from 'rxjs';
import {tap, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export default class UserService {
  private apiUrl = "http://localhost:3000/User";

  private currentUser: any = null;
  private isLoggedIn: boolean = false;

  constructor(private http: HttpClient) {
  }

  getCurrentUser(): any {
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn && this.currentUser !== null;
  }

  getCurrentUserId(): number {
    return this.currentUser.id;
  }

  isAdmin(): boolean {
    return this.isAuthenticated() && this.currentUser?.role === 'admin';
  }

  isClient(): boolean {
    return this.isAuthenticated() && this.currentUser?.role === 'user';
  }

  login(credentials: loginRequest): Observable<loginResponse> {
    console.log('🔍 DEBUGGING: Data being sent to backend:', credentials);
    console.log('🔍 DEBUGGING: Data type:', typeof credentials);
    console.log('🔍 DEBUGGING: Object keys:', Object.keys(credentials));

    return this.http.post<loginResponse>(this.apiUrl + "/login", credentials, {withCredentials: true}).pipe(
      tap((response: loginResponse) => {
        console.log('Full server response:', response);

        if (response.user) {

          this.currentUser = response.user;
          this.isLoggedIn = true;
          console.log('✅ Login successful - session created');

        } else {
          console.error('❌ Server response missing user:', response);
        }
      }),
      catchError((error) => {

        console.error('❌ Login failed:', error);
        console.log('backend error details', error.error);
        return throwError(() => error.message);

      })
    );
  }

  register(userData: registerRequest): Observable<any> {

    return this.http.post<any>(this.apiUrl + "/register", userData, {withCredentials: true}).pipe(
      tap((response: any) => {

        console.log('✅ Registration successful:', response);

      }),

      catchError((error) => {

        console.error('❌ Registration failed:', error);

        return throwError(() => error.message);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/logout", {}, {withCredentials: true}).pipe(
      tap((response: any) => {
        this.currentUser = null;
        this.isLoggedIn = false;
        console.log('✅ Logout successful - session cleared');
      }),
      catchError((error) => {
        console.error('❌ Logout failed:', error);
        // Clear local data even if server logout fails
        this.currentUser = null;
        this.isLoggedIn = false;
        return throwError(() => error.message);
      })
    );
  }


  async initializeAuth(): Promise<void> {
    await firstValueFrom(this.checkAuthStatus());
  }

  checkAuthStatus(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/status", {withCredentials: true}).pipe(
      tap((response: any) => {
        console.log('📊 Auth status response:', response);


        if (response.isAuthenticated) {
          console.log('✅ Session is still valid');
          if (response.user) {
            this.currentUser = response.user;
            this.isLoggedIn = true;
          }
        } else {
          console.log('❌ Session expired or invalid');
          this.currentUser = null;
          this.isLoggedIn = false;
        }
      }),
      catchError((error) => {
        console.error('❌ Checking status failed:', error);
        // If server can't verify, clear local data
        this.currentUser = null;
        this.isLoggedIn = false;
        return throwError(() => error.message);
      })
    );
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(this.apiUrl + "/profile", {withCredentials: true}).pipe(
      tap((response: any) => {
        console.log("✅ Fetched user profile:", response);

        if (response.user) {
          this.currentUser = response.user;
        }
      }),
      catchError((error) => {
        console.error('❌ Getting profile failed:', error);
        return throwError(() => error.message);
      })
    );
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + "/users", {withCredentials: true}).pipe(
      tap((response: any) => {
        console.log("✅ successfully fetched users")
      }), catchError((error: any) => {
        console.error('❌ fetching users failed in UserService:', error);
        return throwError(() => error.message);
      })
    )
  }

  updateUser(userData: User): Observable<User> {
    return this.http.put<User>(this.apiUrl, userData, {withCredentials: true}).pipe(
      tap((response: User) => {

        console.log("successfully updated User in service", response);

      }), catchError((error: any) => {

        console.error('❌ Updating user failed in UserService:', error);
        return throwError(() => error.message);
      })
    )
  }
}



