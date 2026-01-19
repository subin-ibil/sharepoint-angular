import { Component, OnInit } from '@angular/core';
import { employeeTemplate } from './employee.template';
import { employeeStyles } from './employee.styles';

interface Employee {
  id: number;
  name: string;
  department: string;
  email: string;
}

@Component({
  selector: 'app-employee',
  template: employeeTemplate, // Use the imported template
  styles: [employeeStyles], // Use the imported styles
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  newEmployee: Employee = {
    id: 0,
    name: '',
    department: '',
    email: '',
  };

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employees = [
      { id: 1, name: 'John Doe', department: 'IT', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', department: 'HR', email: 'jane@example.com' },
    ];
  }

  addEmployee(): void {
    if (this.newEmployee.name && this.newEmployee.department) {
      this.newEmployee.id = this.employees.length + 1;
      this.employees.push({ ...this.newEmployee });
      this.resetForm();
    }
  }

  deleteEmployee(id: number): void {
    this.employees = this.employees.filter((emp) => emp.id !== id);
  }

  resetForm(): void {
    this.newEmployee = {
      id: 0,
      name: '',
      department: '',
      email: '',
    };
  }
}
