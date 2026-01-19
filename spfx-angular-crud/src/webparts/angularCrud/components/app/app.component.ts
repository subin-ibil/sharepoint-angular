import { Component, OnInit } from '@angular/core';
import { MSGraphClientV3 } from '@microsoft/sp-http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public graphClient!: MSGraphClientV3;
  public siteId!: string;
  public listId!: string;

  public apps: any[] = [];
  public error = '';
  public loading = false;

  ngOnInit(): void {
    console.log('Initialized');
  }

  async loadItems(): Promise<void> {
    if (!this.graphClient || !this.listId) {
      this.error = 'Graph client or List ID not configured';
      return;
    }

    try {
      this.loading = true;
      this.error = '';

      const site = this.siteId === 'root' ? 'root' : this.siteId;

      const response = await this.graphClient
        .api(`/sites/${site}/lists/${this.listId}/items`)
        .expand('fields')
        .top(20)
        .get();

      this.apps = response.value.map((item: any) => ({
        name: item.fields?.Title ?? 'Unknown App',
        version: item.fields?.Version ?? '—',
        devices: item.fields?.Devices ?? 0,
        firstSeen: item.fields?.FirstSeen ?? '—',
        vulnerabilities: item.fields?.Vulnerabilities ?? '—',
      }));
    } catch (err: any) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  }
}
