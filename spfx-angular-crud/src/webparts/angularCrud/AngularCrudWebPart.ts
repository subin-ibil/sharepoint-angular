// EmployeeWebPart.ts
import 'zone.js'; // MUST be first
import { Version } from '@microsoft/sp-core-library';
import { type IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './components/app/app.module';

export default class EmployeeWebPartWebPart extends BaseClientSideWebPart<{}> {
  public render(): void {
    this.domElement.innerHTML = '<app-employee></app-employee>';

    const providers = [{ provide: 'context', useValue: this.context }];

    platformBrowserDynamic(providers)
      .bootstrapModule(AppModule)
      .catch((err) => console.error(err));
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
