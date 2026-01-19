// header.template.ts
export const headerTemplate = `
<div class="header">
  <h1>{{ title }}</h1>
  <p *ngIf="subtitle" class="subtitle">{{ subtitle }}</p>
</div>
`;
