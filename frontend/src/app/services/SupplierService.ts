import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import Supplier from '../models/Supplier';

@Injectable({
  providedIn: 'root'
})
export default class SupplierService {
  private apiUrl = "http://localhost:3000/Supplier";

  constructor(private http: HttpClient) {
  }

  getAllSupplier(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.apiUrl)
  }

  getSupplier(id: number): Observable<Supplier> {
    return this.http.get<Supplier>(`${this.apiUrl}/${id}`);
  }

  addSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http.post<Supplier>(this.apiUrl, supplier);
  }

  update(supplier: Supplier): Observable<Supplier> {
    return this.http.put<Supplier>(this.apiUrl, supplier);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<Supplier>("${this.apiUrl}/${id}");
  }


}
