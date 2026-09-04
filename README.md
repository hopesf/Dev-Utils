# Angular Dev Utils

Modern Angular component library with standalone components and Tailwind CSS.

[![CI](https://github.com/hopesf/angular-dev-utils/actions/workflows/ci.yml/badge.svg)](https://github.com/hopesf/angular-dev-utils/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/%40hopesf%2Fangular-dev-utils.svg)](https://www.npmjs.com/package/@hopesf/angular-dev-utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
npm install @hopesf/angular-dev-utils
```

That's it! No authentication or tokens required.

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

## Components

- **Button** - Customizable button with variants and loading states
- **Input** - Form-ready input with validation
- **Card** - Container with header/footer sections
- **Modal** - Dialog with service and component modes
- **Table** - Data table with sorting and pagination
- **Spinner** - Loading indicator with overlay option

## License

MIT
