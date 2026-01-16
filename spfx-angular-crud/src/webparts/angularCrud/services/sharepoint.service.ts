import { Injectable } from '@angular/core';
import { MSGraphClientV3 } from '@microsoft/sp-http';
import { IListItem, IListItemCreate } from '../models/list-item.model';
import { Observable, from, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SharePointService {
  private graphClient: MSGraphClientV3;
  private siteId: string;
  private listId: string;

  /**
   * Initialize the service with Graph client and site/list information
   */
  public init(graphClient: MSGraphClientV3, siteId: string, listId: string): void {
    this.graphClient = graphClient;
    this.siteId = siteId;
    this.listId = listId;
  }

  /**
   * Get all items from the SharePoint list
   */
  public getItems(): Observable<IListItem[]> {
    return from(
      this.graphClient.api(`/sites/${this.siteId}/lists/${this.listId}/items`).expand('fields').top(100).get()
    ).pipe(
      map((response: any) => response.value as IListItem[]),
      catchError(this.handleError)
    );
  }

  /**
   * Get a single item by ID
   */
  public getItemById(itemId: string): Observable<IListItem> {
    return from(
      this.graphClient.api(`/sites/${this.siteId}/lists/${this.listId}/items/${itemId}`).expand('fields').get()
    ).pipe(
      map((response: any) => response as IListItem),
      catchError(this.handleError)
    );
  }

  /**
   * Create a new item in the SharePoint list
   */
  public createItem(item: IListItemCreate): Observable<IListItem> {
    return from(this.graphClient.api(`/sites/${this.siteId}/lists/${this.listId}/items`).post(item)).pipe(
      map((response: any) => response as IListItem),
      catchError(this.handleError)
    );
  }

  /**
   * Update an existing item
   */
  public updateItem(itemId: string, item: Partial<IListItemCreate>): Observable<IListItem> {
    return from(this.graphClient.api(`/sites/${this.siteId}/lists/${this.listId}/items/${itemId}`).patch(item)).pipe(
      map((response: any) => response as IListItem),
      catchError(this.handleError)
    );
  }

  /**
   * Delete an item
   */
  public deleteItem(itemId: string): Observable<void> {
    return from(this.graphClient.api(`/sites/${this.siteId}/lists/${this.listId}/items/${itemId}`).delete()).pipe(
      map(() => void 0),
      catchError(this.handleError)
    );
  }

  /**
   * Search/filter items
   */
  public searchItems(filter: string): Observable<IListItem[]> {
    return from(
      this.graphClient.api(`/sites/${this.siteId}/lists/${this.listId}/items`).expand('fields').filter(filter).get()
    ).pipe(
      map((response: any) => response.value as IListItem[]),
      catchError(this.handleError)
    );
  }

  /**
   * Error handler
   */
  private handleError(error: any): Observable<never> {
    console.error('SharePoint Service Error:', error);
    let errorMessage = 'An error occurred while communicating with SharePoint';

    if (error.statusCode) {
      switch (error.statusCode) {
        case 401:
          errorMessage = 'Unauthorized. Please check API permissions.';
          break;
        case 403:
          errorMessage = 'Forbidden. You do not have access to this resource.';
          break;
        case 404:
          errorMessage = 'Resource not found. Please check the list ID.';
          break;
        default:
          errorMessage = error.message || errorMessage;
      }
    } else if (error.message) {
      errorMessage = error.message;
    }

    return throwError(() => new Error(errorMessage));
  }
}
