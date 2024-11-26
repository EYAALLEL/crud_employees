import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000/employees'; // URL correcte

  constructor(private http: HttpClient) { }

  // Récupérer tous les employés
  getEmployeesList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl); // Utilisation de apiUrl
  }

  // Créer un nouvel employé
  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee); // Utilisation de apiUrl
  }

  // Obtenir un employé par son ID
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`); // Utilisation de apiUrl
  }

  // Mettre à jour un employé
  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee); // Utilisation de apiUrl
  }

  // Supprimer un employé
  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`); // Utilisation de apiUrl
  }
}
