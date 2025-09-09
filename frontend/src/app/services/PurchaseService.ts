import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Purchase, purchasedProduct,PurchasedProductWithDetails} from '../models/Purchase'

import {catchError, tap,map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export default class PurchaseService {
  private apiUrl = 'http://localhost:3000/Purchase';

  constructor(private http: HttpClient) {
  }

  createPurchase(purchaseData: { userId: number, totalAmount: number, products: purchasedProduct[] }): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/create", purchaseData).pipe(

      map((response:any)=>{

        return response.purchases || [];

      }),

      tap((response: any) => {
        console.log('Purchase with products created:', response);
      }),
      catchError((error: any) => {
        console.error('Purchase creation failed in PurchaseService:', error);
        return throwError(() => error.message);
      })
    );
  }

  getPurchasesByUserId(userId: number ,order : 'asc' | 'desc' = 'desc') {
    return this.http.get<Purchase[]>(`${this.apiUrl}/ByUserId/${userId}/?order=${order}`, {withCredentials: true}).pipe(
      tap((response:Purchase[])=>{

        console.log('🛒 Purchase service response:', response);
        console.log('🛒 Number of purchases ',response.length);
        return response;

      }),catchError((error:any)=>{

        console.error('❌ Purchase service error:', error);
        return throwError(() => error.message);
      })
    )



  }

  getPurchasesByUserIdInAscendingOrder(userId: number): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(`${this.apiUrl}/byUserInAsc/${userId}`, {withCredentials: true}).pipe(
      tap((response: any) => {

        console.log('🛒 Purchase service response:', response);
        console.log('🛒 Number of purchases ',response.length);
      }),
      catchError((error: any) => {
        console.error('❌ Purchase service error:', error);
        return throwError(() => error.message);
      })
    )
  }
  getPurchasesByUserIdInDescendingOrder(userId: number): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(`${this.apiUrl}/byUserInDesc/${userId}`, {withCredentials: true}).pipe(
      tap((response: any) => {

        console.log('🛒 Purchase service response:', response);
        console.log('🛒 Number of purchases ',response.length);
      }),
      catchError((error: any) => {
        console.error('❌ Purchase service error:', error);
        return throwError(() => error.message);
      })
    )
  }

  getItemsByPurchaseId(purchaseId: number): Observable<PurchasedProductWithDetails[]> {
    return this.http.get<PurchasedProductWithDetails[]>(`${this.apiUrl}/byPurchase/${purchaseId}`, {withCredentials: true}).pipe(
      tap((response: any) => {

        console.log('🛒 Items fetched for purchase', purchaseId, ':', response);
        console.log('🛒 Number of items:', response.length);

      }),
      catchError((error: any) => {
        console.error('❌ Purchase service error:', error);
        return throwError(() => error.message);
      })
    )
  }

        getaAllPurchases():Observable<Purchase[]>{
     return  this.http.get<Purchase[]>(`${this.apiUrl}/getAll`, {withCredentials: true}).pipe(
       tap((response:any) => {

         console.log("successfully fetched all purchases", response);

       }),catchError((error:any)=>{
         console.error('❌ Purchase service error:', error);
         return throwError(() => error.message);
       })
     )
        }
}
