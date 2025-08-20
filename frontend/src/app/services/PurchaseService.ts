import {Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
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

  getPurchasesByUserId(userId: number): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(`${this.apiUrl}/byUser/${userId}`, {withCredentials: true}).pipe(
      tap((response: any) => {

        console.log('🛒 Purchase service response:', response);
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


}
