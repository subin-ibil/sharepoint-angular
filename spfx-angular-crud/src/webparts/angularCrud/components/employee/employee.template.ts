export const employeeTemplate = `
  <div class="employee-container">
    <h2>Employee Directory</h2>

    <!-- Loading Indicator -->
    <div *ngIf="loading" class="loading">
      <div class="spinner"></div>
      <p>Loading employees from SharePoint...</p>
    </div>

    <!-- Error Message -->
    <div *ngIf="error" class="error-message">
      <strong>⚠️ Error:</strong> {{ error }}
    </div>

    <!-- Add Employee Form -->
    <div class="add-employee-form" *ngIf="!loading">
      <h3>Add New Employee</h3>
      <div class="form-group">
        <input
          type="text"
          [(ngModel)]="newEmployee.Title"
          placeholder="Name"
          class="form-input"
        />
        <input
          type="text"
          [(ngModel)]="newEmployee.Department"
          placeholder="Department"
          class="form-input"
        />
        <input
          type="email"
          [(ngModel)]="newEmployee.Email"
          placeholder="Email"
          class="form-input"
        />
        <button (click)="addEmployee()" class="btn-add">Add Employee</button>
      </div>
    </div>

    <!-- Employee Table -->
    <div *ngIf="!loading && employees.length > 0" class="table-container">
      <p class="employee-count">Total Employees: {{ employees.length }}</p>
      <table class="employee-table">
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
            <td>{{ employee.Id }}</td>
            <td>{{ employee.Title }}</td>
            <td>{{ employee.Department || 'N/A' }}</td>
            <td>{{ employee.Email || 'N/A' }}</td>
            <td>
              <button
                (click)="deleteEmployee(employee.Id)"
                class="btn-delete"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- No Data Message -->
    <div *ngIf="!loading && !error && employees.length === 0" class="no-data">
      <p>No employees found. Add your first employee above!</p>
    </div>
  </div>
`;
