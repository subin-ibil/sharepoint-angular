// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { EmployeeComponent } from '../employee/employee.component';
import { HeaderComponent } from './header/header.component';

// Import your components

@NgModule({
  declarations: [
    EmployeeComponent,
    HeaderComponent, // ← Add all child components here
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [EmployeeComponent],
})
export class AppModule {}

// ===============================================
// If you're creating additional components:
// ===============================================

// Example: Creating a header component
// Run: ng generate component components/header
// Or create manually:

/*
// header.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title = 'Employee Management System';
}
*/

// Then add to declarations array above:
// declarations: [
//   EmployeeComponent,
//   HeaderComponent
// ]
