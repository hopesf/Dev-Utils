# Angular Dev Utils

Modern Angular component library with standalone components and Tailwind CSS.

## Installation

```bash
npm install angular-dev-utils
```

## Quick Start

Import components directly in your standalone components:

```typescript
import { Component } from "@angular/core";
import { ButtonComponent, CardComponent, InputComponent } from "angular-dev-utils";

@Component({
  selector: "app-example",
  standalone: true,
  imports: [ButtonComponent, CardComponent, InputComponent],
  template: `
    <adu-card>
      <adu-input label="Name" [(ngModel)]="name"></adu-input>
      <adu-button variant="primary" (clicked)="submit()">Submit</adu-button>
    </adu-card>
  `,
})
export class ExampleComponent {
  name = "";

  submit() {
    console.log("Name:", this.name);
  }
}
```

## Documentation

For full documentation, visit the [main README](../../README.md).

## Components

- **Button** - Customizable button with variants and loading states
- **Input** - Form-ready input with validation
- **Card** - Container with header/footer sections
- **Modal** - Dialog with service and component modes
- **Table** - Data table with sorting and pagination
- **Spinner** - Loading indicator with overlay option

## License

MIT
