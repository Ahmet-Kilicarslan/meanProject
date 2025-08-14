import {Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable, signal, computed} from '@angular/core';
import {Purchase, purchasedProduct} from '../models/Purchase'

import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export default class PurchaseService {
  private apiUrl = 'http://localhost:3000/Purchase';

  constructor(private http: HttpClient) {
  }

  private cartItemSignal = signal<{ product: purchasedProduct, quantity: number }[]>([]);
  successMessage = signal<string>('');
  purchaseStatus = signal<'idle' | 'processing' | 'success' | 'error'>('idle');

  cartCount = computed(() => this.cartItemSignal().reduce(
    (total, item) => total + item.quantity, 0) );



  createPurchase(purchaseData: { userId: number, totalAmount: number, products: purchasedProduct[] }): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/complete", purchaseData).pipe(
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
