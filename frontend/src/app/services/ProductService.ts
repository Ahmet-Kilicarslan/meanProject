import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Product from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export default class ProductService {
  private apiUrl = 'http://localhost:3000/Product';
  constructor(private http: HttpClient) { }

 getAllProducts():Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);

 }
 getProductBySupplier(supplier:number):Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/${supplier}`);
 }
 getProductById(id: number):Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
 }

 addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);

 }
 updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.apiUrl, product);
 }
 deleteProduct(id: number): Observable<Object> {
    return this.http.delete(`${this.apiUrl}/${id}`);
 }

}
