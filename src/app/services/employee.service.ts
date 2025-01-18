import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { catchError, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'https://retoolapi.dev/HYd96h/data';

  constructor(private http: HttpClient) {}

  getEmployees(page: number, pageSize: number): Observable<Employee[]> {
    const url = `${this.apiUrl}?_page=${page}&_limit=${pageSize}`;
    return this.http.get<Employee[]>(url).pipe(
      catchError((error) => {
        console.error('Error fetching employees:', error);
        return throwError(() => new Error('Failed to fetch employees'));
      })
    );
  }
  getTotalEmployees(): Observable<number> {
    return this.http.get<Employee[]>(this.apiUrl).pipe(
      map((employees: Employee[]) => employees.length), 
      catchError((error) => {
        console.error('Error fetching total employees:', error);
        return throwError(() => new Error('Failed to fetch total employees'));
      })
    );
  }
  
}
