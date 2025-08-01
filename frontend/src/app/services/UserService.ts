import {User,loginRequest,registerRequest} from '../models/User'
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
/*Behaivoral Subject--->
* What is BehaviorSubject?
BehaviorSubject is like a smart variable that can:

Hold a value (like a regular variable)
Notify everyone when the value changes
Remember the last value for new subscribers

Simple Analogy:
Think of BehaviorSubject like a radio station:

The radio station broadcasts the current song (holds current value)
People can tune in to listen (subscribe)
New listeners immediately hear the current song (get current value)
When the song changes, everyone hears it at the same time (all subscribers get notified)
*
* *****************  Observable ********************************
* Observable is a design pattern and data structure that represents a stream of data or events over time. It's most commonly associated with reactive programming and is widely used in JavaScript/TypeScript through libraries like RxJS.
Core Concept
An Observable is like a "lazy" collection of values that arrive over time. Think of it as:

A function that can return multiple values
A stream of data that you can subscribe to
A way to handle asynchronous operations
*
*Observable                                  promise
* Can emit multiple values              Single value only
* Lazy (cold)                           Eager (hot)
* Cancellable                           Not cancellable
* Rich operators (map, filter, etc.)    Limited chaining
*/
export default class UserService {
  private apiUrl = "http://localhost:3000/User";


  private isLoggedInBehaviorSubject = new BehaviorSubject<boolean>(false);
  private isLoggedIn$ = this.isLoggedInBehaviorSubject.asObservable();

  private currentUserBehaviorSubject = new BehaviorSubject<User | null>(null);
  private currentUser$ = this.currentUserBehaviorSubject.asObservable();

  //helper methods

  isAuthenticated():boolean {
    return this.isLoggedInBehaviorSubject.value;
  }
  getCurrentUser(): User | null{
    return this.currentUserBehaviorSubject.value;

}
  hasRole(role:string):boolean {
    const user=this.getCurrentUser();
    return user ? user.role === role : false;

  }
  isAdmin(): boolean {
    return this.hasRole('admin');
  }


  constructor(
    private http: HttpClient,
    private router: Router
  ) {

  }

  register(user: registerRequest): Observable<any> {
    console.log('📝 Registering user:', user.username);
    return this.http.post(`${this.apiUrl}/register`, user)
  }

  login(credentials: loginRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials,
      {withCredentials: true}).pipe(
      tap((response: any) => {
        console.log('✅ Login successful:', response);
        this.isLoggedInBehaviorSubject.next(true);
        this.currentUserBehaviorSubject.next(response.user);

      }),
      catchError((error) => {
        // CLEAR PURPOSE: Handle errors
        console.error('❌ Login failed:', error);
        throw error; // Re-throw for component to handle
      })
    );

  }
  // LOGOUT - Destroy session
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {withCredentials: true}).pipe(
      tap((response: any) => {
        this.isLoggedInBehaviorSubject.next(false);
        this.currentUserBehaviorSubject.next(null);
      }),catchError((error)=>{
        console.error('❌ Logout error:', error);
        this.isLoggedInBehaviorSubject.next(false);
        this.currentUserBehaviorSubject.next(null);
        throw error;


      })
    );

  }

  checkAuthStatus():Observable<any> {
    return this.http.post(`${this.apiUrl}/status`, {withCredentials: true}).pipe(
      tap((response: any) => {
        console.log('📊 Auth status response:', response);

        this.isLoggedInBehaviorSubject.next(response.isAuthenticated);
        this.currentUserBehaviorSubject.next(response.user||null);

      }),
      catchError((error)=>{
        console.error('Auth status failed',error);
        this.isLoggedInBehaviorSubject.next(false);
        this.currentUserBehaviorSubject.next(null);
        throw error;
      })
    );
  }
  getProfile(): Observable<any> {
    console.log('👤 Getting user profile...');

    return this.http.get(`${this.apiUrl}/profile`, {
      withCredentials: true // Send session cookie
    });
  }


}

