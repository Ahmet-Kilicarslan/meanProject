import {User, loginRequest, registerRequest, loginResponse} from '../models/User'
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, BehaviorSubject, throwError} from 'rxjs';
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

  isAdmin(): boolean {
    return this.isAuthenticated() && this.currentUser?.role === 'admin';
  }

  isClient(): boolean {
    return this.isAuthenticated() && this.currentUser?.role === 'user';
  }

  login(credentials: loginRequest): Observable<any> {
    console.log('🔍 DEBUGGING: Data being sent to backend:', credentials);
    console.log('🔍 DEBUGGING: Data type:', typeof credentials);
    console.log('🔍 DEBUGGING: Object keys:', Object.keys(credentials));
    return this.http.post<any>(this.apiUrl + "/login", credentials, {withCredentials: true}).pipe(
      tap((response: any) => {
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
        console.log('backend error details',error.error);
        return throwError(error);
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
        return throwError(error);
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
        return throwError(error);
      })
    );
  }

  checkAuthStatus(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/status", {withCredentials: true}).pipe(
      tap((response: any) => {
        console.log('📊 Auth status response:', response);

        // Match your backend response structure
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
        return throwError(error);
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
        return throwError(error);
      })
    );
  }
}

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

export default class UserService {
  private apiUrl = "http://localhost:3000/User";


  private isLoggedInBehaviorSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInBehaviorSubject.asObservable();

  private currentUserBehaviorSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserBehaviorSubject.asObservable();


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

        console.error('❌ Login failed:', error);
        throw error;
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
    return this.http.get(`${this.apiUrl}/status`, {withCredentials: true}).pipe(
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


}*/

