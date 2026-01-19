// services/employee.service.ts (Graph API Version)
import { Injectable } from '@angular/core';
import { MSGraphClientV3 } from '@microsoft/sp-http';
import { Observable, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Employee {
  Id: number;
  Title: string;
  Email?: string;
  Department?: string;
}

interface GraphListItemsResponse {
  value: any[];
}

@Injectable()
export class EmployeeService {
  private graphClient!: MSGraphClientV3;
  private siteId!: string;
  private listId!: string;

  public initialize(graphClient: MSGraphClientV3, siteId: string, listId: string): void {
    this.graphClient = graphClient;
    this.siteId = siteId;
    this.listId = listId;
  }

  // Get all employees using Microsoft Graph API
  public getEmployees(): Observable<Employee[]> {
    console.log('Fetching employees from Graph API...');

    return from(this.graphClient.api(`/sites/${this.siteId}/lists/${this.listId}/items`).expand('fields').get()).pipe(
      map((response: GraphListItemsResponse) => {
        console.log('Raw Graph API response:', response);

        // Transform Graph API response to our Employee interface
        return response.value.map((item: any) => ({
          Id: item.fields.id || item.id,
          Title: item.fields.Title,
          Email: item.fields.Email,
          Department: item.fields.department,
        }));
      }),
      catchError((error) => {
        console.error('Error fetching from Graph API:', error);
        throw error;
      })
    );
  }

  // Get employee by ID using Graph API
  public getEmployeeById(id: number): Observable<Employee> {
    return from(
      this.graphClient.api(`/sites/${this.siteId}/lists/${this.listId}/items/${id}`).expand('fields').get()
    ).pipe(
      map((item: any) => ({
        Id: item.fields.id || item.id,
        Title: item.fields.Title,
        Email: item.fields.Email,
        Department: item.fields.Department,
      })),
      catchError((error) => {
        console.error('Error fetching employee by ID from Graph API:', error);
        throw error;
      })
    );
  }

  // BONUS: Get all users from Azure AD (not just SharePoint list)
  public getAllUsers(): Observable<any[]> {
    return from(this.graphClient.api('/users').top(999).select('id,displayName,mail,department,jobTitle').get()).pipe(
      map((response: any) => response.value),
      catchError((error) => {
        console.error('Error fetching users from Graph API:', error);
        throw error;
      })
    );
  }
}
