// header.component.ts
import { Component, Input } from '@angular/core';
import { headerTemplate } from './header.template';
import { headerStyles } from './header.styles';

@Component({
  selector: 'app-header', // ← This is what you use in templates
  template: headerTemplate,
  styles: [headerStyles],
})
export class HeaderComponent {
  @Input() title: string = 'Employee Management';
  @Input() subtitle?: string;
}
