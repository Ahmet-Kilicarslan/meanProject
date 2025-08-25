import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import Product from '../models/Product';
import ProductWithDetails from '../models/ProductWithDetails';

@Injectable({
  providedIn: 'root'
})
export default class ProductService {
  private apiUrl = 'http://localhost:3000/Product';

  constructor(private http: HttpClient) {
  }

  getAllProductsWithDetails(): Observable<ProductWithDetails[]> {
    return this.http.get<ProductWithDetails[]>(`${this.apiUrl}/getALLWithDetails`).pipe(
      tap((response) => {
        console.log("successfully updated product amount in service", response);
        return response;
      }),catchError((error)=>{
        console.error(error);
        return throwError(() => error.message);
      })
    );
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);

  }

  getProductBySupplier(supplier: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/${supplier}`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);

  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.apiUrl, product);
  }

  updateProductAmount(id: number, newAmount: number): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, {amount:newAmount}).pipe(
      tap((response) => {
        console.log("successfully updated product amount in service", response);
      }), catchError((error) => {
        console.error(error);
        return throwError(() => error.message);

      })
    );
  }

  deleteProduct(id: number): Observable<Object> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
