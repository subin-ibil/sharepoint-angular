// button.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button [type]="type" [class]="'btn ' + variant" [disabled]="disabled" (click)="handleClick()">
      {{ label }}
    </button>
  `,
  styles: [
    `
      .btn {
        padding: 10px 20px;
        border: none;
        border-radius: 2px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        transition: background-color 0.2s;
      }

      .btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .primary {
        background-color: #0078d4;
        color: white;
      }

      .primary:hover:not(:disabled) {
        background-color: #106ebe;
      }

      .secondary {
        background-color: #edebe9;
        color: #323130;
      }

      .secondary:hover:not(:disabled) {
        background-color: #e1dfdd;
      }

      .danger {
        background-color: #d13438;
        color: white;
      }

      .danger:hover:not(:disabled) {
        background-color: #a4262c;
      }
    `,
  ],
})
export class ButtonComponent {
  @Input() label: string = 'Button';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() disabled: boolean = false;

  @Output() clicked = new EventEmitter<void>();

  handleClick(): void {
    if (!this.disabled) {
      this.clicked.emit();
    }
  }
}

// Usage in employee.template.ts:
// <app-button
//   [label]="'Add Employee'"
//   [variant]="'primary'"
//   [type]="'submit'"
// ></app-button>
//
// <app-button
//   [label]="'Delete'"
//   [variant]="'danger'"
//   (clicked)="deleteEmployee(employee.id)"
// ></app-button>
