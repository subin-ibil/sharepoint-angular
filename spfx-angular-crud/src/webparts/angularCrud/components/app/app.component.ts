import { Component, OnInit } from '@angular/core';
import { MSGraphClientV3 } from '@microsoft/sp-http';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>Angular CRUD Web Part</h1>
      <p *ngIf="!listId">Please configure the List ID in the web part properties.</p>
      <div *ngIf="listId">
        <p>
          Connected to Site: <strong>{{ siteId }}</strong>
        </p>
        <p>
          List ID: <strong>{{ listId }}</strong>
        </p>
        <button (click)="loadItems()">Load Items</button>
        <div *ngIf="items.length > 0">
          <h2>Items:</h2>
          <ul>
            <li *ngFor="let item of items">{{ item.fields?.Title || 'No Title' }}</li>
          </ul>
        </div>
        <p *ngIf="error" style="color: red;">{{ error }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        padding: 20px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }
      h1 {
        color: #0078d4;
        margin-bottom: 20px;
      }
      button {
        background-color: #0078d4;
        color: white;
        border: none;
        padding: 10px 20px;
        cursor: pointer;
        border-radius: 2px;
        font-size: 14px;
      }
      button:hover {
        background-color: #106ebe;
      }
      ul {
        list-style: none;
        padding: 0;
      }
      li {
        padding: 10px;
        border-bottom: 1px solid #edebe9;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  public graphClient: MSGraphClientV3;
  public siteId: string;
  public listId: string;
  public items: any[] = [];
  public error: string = '';

  ngOnInit(): void {
    console.log('AppComponent initialized', {
      siteId: this.siteId,
      listId: this.listId,
      hasGraphClient: !!this.graphClient,
    });
  }

  public async loadItems(): Promise<void> {
    if (!this.graphClient || !this.listId) {
      this.error = 'Graph client or List ID not configured';
      return;
    }

    try {
      this.error = '';
      const siteIdToUse = this.siteId === 'root' ? 'root' : this.siteId;

      console.log('Loading items from list:', this.listId);

      const response = await this.graphClient
        .api(`/sites/${siteIdToUse}/lists/${this.listId}/items`)
        .expand('fields')
        .top(10)
        .get();

      this.items = response.value;
      console.log('Items loaded:', this.items);
    } catch (err: any) {
      console.error('Error loading items:', err);
      this.error = `Error loading items: ${err.message}`;
    }
  }
}
