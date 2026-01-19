// EmployeeWebPart.ts (Graph API Version)
import 'zone.js';
import { Version } from '@microsoft/sp-core-library';
import { type IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './components/app/app.module';
import { employeeServiceInstance } from '../../services/employee-instance';

export default class EmployeeWebPartWebPart extends BaseClientSideWebPart<{}> {
  private isRendered: boolean = false;

  public async render(): Promise<void> {
    if (!this.isRendered) {
      try {
        // Get Microsoft Graph client
        const graphClient = await this.context.msGraphClientFactory.getClient('3');

        // Get site ID and list ID
        const siteId = this.context.pageContext.site.id.toString();

        // Get list ID dynamically by name
        const listId = await this.getListIdByTitle(graphClient, siteId, 'EmployeeList');

        // Initialize the service with Graph client
        employeeServiceInstance.initialize(graphClient, siteId, listId);

        this.domElement.innerHTML = '<app-employee></app-employee>';

        platformBrowserDynamic()
          .bootstrapModule(AppModule)
          .then(() => {
            this.isRendered = true;
            console.log('Angular app bootstrapped with Graph API!');
          })
          .catch((err) => console.error('Error bootstrapping Angular:', err));
      } catch (error) {
        console.error('Error initializing Graph API:', error);
        this.domElement.innerHTML = `
          <div style="padding: 20px; color: red; border: 1px solid red;">
            <strong>Error:</strong> Failed to initialize Microsoft Graph API.
            <br>Make sure the web part has the required API permissions.
          </div>
        `;
      }
    }
  }

  // Helper function to get list ID by title
  private async getListIdByTitle(graphClient: any, siteId: string, listTitle: string): Promise<string> {
    try {
      console.log(`Searching for list: "${listTitle}" in site: ${siteId}`);

      const listsResponse = await graphClient
        .api(`/sites/${siteId}/lists`)
        .filter(`displayName eq '${listTitle}'`)
        .get();

      console.log('Lists found:', listsResponse);

      if (listsResponse.value && listsResponse.value.length > 0) {
        const listId = listsResponse.value[0].id;
        console.log(`Found list "${listTitle}" with ID: ${listId}`);
        return listId;
      } else {
        console.error(`List "${listTitle}" not found. Available lists:`, listsResponse);

        // Get all lists to help debug
        const allListsResponse = await graphClient.api(`/sites/${siteId}/lists`).get();

        console.log(
          'All available lists:',
          allListsResponse.value.map((l: any) => ({
            name: l.displayName,
            id: l.id,
          }))
        );

        throw new Error(`List '${listTitle}' not found. Check console for available lists.`);
      }
    } catch (error) {
      console.error('Error getting list ID:', error);
      throw error;
    }
  }

  protected onDispose(): void {
    this.domElement.innerHTML = '';
    this.isRendered = false;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [],
    };
  }
}
