import {Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Purchase, purchasedProduct} from '../models/Purchase'

import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export default class PurchaseService {
  private apiUrl = 'http://localhost:3000/Purchase';

  constructor(private http: HttpClient) {
  }

  createPurchase(purchaseData: { userId: number, totalAmount: number, products: purchasedProduct[] }): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/create", purchaseData).pipe(
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
    return this.http.get<Purchase[]>(`${this.apiUrl}/${userId}`).pipe(
      tap((response: any) => {
        console.log(response);
      }), catchError((error: any) => {

        return throwError(() => error.message);
      })
    )
  }


}
