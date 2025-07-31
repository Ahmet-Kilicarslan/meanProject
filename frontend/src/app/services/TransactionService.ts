import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import Transaction from '../models/Transaction';
@Injectable({
  providedIn: 'root'
})
export default class TransactionService {
  private apiUrl="http://localhost:3000/Transaction";
  constructor(private http: HttpClient) { }
}
