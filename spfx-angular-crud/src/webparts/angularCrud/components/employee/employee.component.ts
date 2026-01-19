import { Component, OnInit } from '@angular/core';
import { employeeTemplate } from './employee.template';
import { employeeStyles } from './employee.styles';
import { Employee } from '../../../../services/employee.service';
import { employeeServiceInstance } from '../../../../services/employee-instance';

@Component({
  selector: 'app-employee',
  template: employeeTemplate,
  styles: [employeeStyles],
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  loading: boolean = false;
  error: string = '';
  newEmployee: Employee = {
    Id: 0,
    Title: '',
    Department: '',
    Email: '',
  };

  // Remove the constructor completely!

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading = true;
    this.error = '';

    // Use employeeServiceInstance instead of this.employeeService
    employeeServiceInstance.getEmployees().subscribe({
      next: (data: Employee[]) => {
        this.employees = data;
        this.loading = false;
        console.log('Employees loaded from SharePoint:', data);
      },
      error: (err) => {
        this.error = 'Failed to load employees from SharePoint. Please check if the EmployeeList exists.';
        this.loading = false;
        console.error('Error loading employees:', err);
      },
    });
  }

  addEmployee(): void {
    if (this.newEmployee.Title && this.newEmployee.Department) {
      this.newEmployee.Id = this.employees.length + 1;
      this.employees.push({ ...this.newEmployee });
      this.resetForm();
    }
  }

  deleteEmployee(id: number): void {
    this.employees = this.employees.filter((emp) => emp.Id !== id);
  }

  resetForm(): void {
    this.newEmployee = {
      Id: 0,
      Title: '',
      Department: '',
      Email: '',
    };
  }
}
