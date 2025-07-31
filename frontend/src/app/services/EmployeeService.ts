import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import Employee from '../models/Employee';


@Injectable({
  providedIn: 'root'

})
export default class EmployeeService {
  private apiUrl="http://localhost:3000/Employee";
  constructor(private http: HttpClient) { }


  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);

  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }
  updateEmployee( employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.apiUrl, employee);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
