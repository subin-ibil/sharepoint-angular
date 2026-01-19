// employee.template.ts
export const employeeTemplate = `
<div class="employee-container">
  <!-- Use the header component here -->
  <app-header
    [title]="'Employee Management System'"
    [subtitle]="'Manage your team members'"
  ></app-header>

  <!-- Add Employee Form -->
  <div class="form-section">
    <h3>Add New Employee</h3>
    <form (ngSubmit)="addEmployee()">
      <div class="form-group">
        <label>Name:</label>
        <input
          type="text"
          [(ngModel)]="newEmployee.name"
          name="name"
          placeholder="Enter name"
          required
        />
      </div>

      <div class="form-group">
        <label>Department:</label>
        <input
          type="text"
          [(ngModel)]="newEmployee.department"
          name="department"
          placeholder="Enter department"
          required
        />
      </div>

      <div class="form-group">
        <label>Email:</label>
        <input
          type="email"
          [(ngModel)]="newEmployee.email"
          name="email"
          placeholder="Enter email"
        />
      </div>

      <button type="submit" class="btn-primary">Add Employee</button>
      <button type="button" class="btn-secondary" (click)="resetForm()">Reset</button>
    </form>
  </div>

  <!-- Employee List -->
  <div class="list-section">
    <h3>Employee List</h3>
    <table *ngIf="employees.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Department</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let employee of employees">
          <td>{{ employee.id }}</td>
          <td>{{ employee.name }}</td>
          <td>{{ employee.department }}</td>
          <td>{{ employee.email }}</td>
          <td>
            <button
              class="btn-delete"
              (click)="deleteEmployee(employee.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <p *ngIf="employees.length === 0" class="no-data">
      No employees found. Add one above!
    </p>
  </div>
</div>
`;
