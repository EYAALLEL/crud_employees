import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployeesList().subscribe(
      data => {
        // Assurez-vous que chaque employé a un id
        this.employees = data.map(employee => ({
          ...employee,
          id: employee.id || 0 // Fournir un id par défaut si absent
        }));
      },
      error => {
        console.error('Erreur lors de la récupération des employés', error);
      }
    );
  }

  // Autres méthodes restent les mêmes
  addEmployee() {
    this.router.navigate(['/create-employee']);
  }

  employeeDetails(id: number | undefined) {
    if (id !== undefined) {
      this.router.navigate(['/employee-details', id]);
    }
  }

  updateEmployee(id: number | undefined) {
    if (id !== undefined) {
      this.router.navigate(['/update-employee', id]);
    }
  }

  deleteEmployee(id: number | undefined) {
    if (id !== undefined) {
      this.employeeService.deleteEmployee(id).subscribe(
        () => {
          console.log('Employé supprimé avec succès');
          this.getEmployees();
        },
        error => {
          console.error('Erreur lors de la suppression', error);
        }
      );
    }
  }
}