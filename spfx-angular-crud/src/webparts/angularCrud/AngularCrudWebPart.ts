import 'zone.js'; // Must be first import

import { Version } from '@microsoft/sp-core-library';
import { type IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { MSGraphClientV3 } from '@microsoft/sp-http';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './components/app/app.module';
import { AppComponent } from './components/app/app.component';
import { NgModuleRef, ApplicationRef } from '@angular/core';

export interface IAngularCrudWebPartProps {
  siteId: string;
  listId: string;
}

export default class AngularCrudWebPart extends BaseClientSideWebPart<IAngularCrudWebPartProps> {
  private moduleRef: NgModuleRef<AppModule> | null = null;

  protected async onInit(): Promise<void> {
    await super.onInit();
  }

  public render(): void {
    if (this.renderedOnce === false) {
      this.domElement.innerHTML = '<app-root>Loading...</app-root>';

      // Get Graph client and bootstrap Angular
      this.context.msGraphClientFactory
        .getClient('3')
        .then((client: MSGraphClientV3) => {
          console.log('Graph client obtained successfully');

          return platformBrowserDynamic()
            .bootstrapModule(AppModule)
            .then((moduleRef: NgModuleRef<AppModule>) => {
              console.log('Angular module bootstrapped successfully');
              this.moduleRef = moduleRef;

              // Get the component instance through ApplicationRef
              const appRef = moduleRef.injector.get(ApplicationRef);
              const componentRef = appRef.components[0];

              if (componentRef) {
                const component = componentRef.instance as AppComponent;

                // Set properties
                component.graphClient = client;
                component.siteId = this.properties.siteId || 'root';
                component.listId = this.properties.listId || '';

                console.log('Component properties set:', {
                  siteId: component.siteId,
                  listId: component.listId,
                });

                // Trigger change detection
                componentRef.changeDetectorRef.detectChanges();
              }
            });
        })
        .catch((err) => {
          console.error('Error bootstrapping Angular:', err);
          this.domElement.innerHTML = `
            <div style="padding: 20px; background: #fee; border: 1px solid #fcc; border-radius: 4px;">
              <h3 style="color: #c00; margin-top: 0;">Error Loading Application</h3>
              <p><strong>Message:</strong> ${err.message || 'Unknown error'}</p>
              <p><strong>Check console for details</strong></p>
            </div>
          `;
        });
    }
  }

  protected onDispose(): void {
    if (this.moduleRef) {
      this.moduleRef.destroy();
      this.moduleRef = null;
    }
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'Configure your SharePoint list connection',
          },
          groups: [
            {
              groupName: 'Settings',
              groupFields: [
                PropertyPaneTextField('siteId', {
                  label: 'Site ID',
                  description: 'Leave as "root" for current site',
                  value: 'root',
                }),
                PropertyPaneTextField('listId', {
                  label: 'List ID',
                  description: 'Enter the GUID of your SharePoint list',
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
