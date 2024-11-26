import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  id!: number;
  employee: Employee = {
  firstName: '',
  lastName: '',
  emailId: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    
    this.employeeService.getEmployeeById(this.id)
      .subscribe(
        data => {
          this.employee = data;
        },
        error => console.log(error)
      );
  }

  onSubmit() {
    this.employeeService.updateEmployee(this.id, this.employee)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/employees']);
        },
        error => console.log(error)
      );
  }

  goToList() {
    this.router.navigate(['/employees']);
  }
}