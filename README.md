# Angular Dev Utils

Modern Angular component library with standalone components and Tailwind CSS.

[![CI](https://github.com/hopesf/Dev-Utils/actions/workflows/ci.yml/badge.svg)](https://github.com/hopesf/Dev-Utils/actions/workflows/ci.yml)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/hopesf/Dev-Utils)](https://github.com/hopesf/Dev-Utils/packages)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

### From GitHub Packages

First, configure npm to use GitHub Packages by creating or editing `.npmrc` in your project:

```bash
@hopesf:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

Then install the package:

```bash
npm install @hopesf/angular-dev-utils
```

### Authentication

You need a GitHub Personal Access Token (PAT) with `read:packages` permission:

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `read:packages` scope
3. Replace `YOUR_GITHUB_TOKEN` in `.npmrc` with your token

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
