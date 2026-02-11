# Angular Dev Utils

Modern, customizable Angular component library built with standalone components and styled with Tailwind CSS.

## 🚀 Features

- ✨ **Standalone Components** - ready for Angular 17+ standalone API
- 🎨 **Tailwind CSS** - modern, utility-first styling
- 📦 **Tree-shakeable** - only bundle what you use
- 🔧 **Highly Customizable** - extensive configuration options
- 📱 **Responsive** - mobile-first design approach
- ⚡ **Performance Optimized** - minimal bundle size
- 🔒 **Type Safe** - full TypeScript support
- 🌐 **Version Compatible** - supports Angular 17, 18, 19, and 20+

## 📦 Installation

```bash
npm install angular-dev-utils
```

### Peer Dependencies

This library requires:
- `@angular/common` ^17.0.0 || ^18.0.0 || ^19.0.0 || ^20.0.0
- `@angular/core` ^17.0.0 || ^18.0.0 || ^19.0.0 || ^20.0.0

### Tailwind CSS Setup

1. Install Tailwind CSS in your Angular project:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

2. Configure `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/angular-dev-utils/**/*.{html,ts,js,mjs}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

3. Add Tailwind directives to your `styles.scss`:

```scss
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 🎯 Components

### Button Component

Versatile button component with multiple variants and sizes.

```typescript
import { ButtonComponent } from 'angular-dev-utils';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <adu-button variant="primary" size="md" (clicked)="handleClick()">
      Click Me
    </adu-button>
  `
})
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `disabled`: boolean
- `loading`: boolean
- `fullWidth`: boolean

### Input Component

Form-ready input component with validation support.

```typescript
import { InputComponent } from 'angular-dev-utils';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InputComponent, FormsModule],
  template: `
    <adu-input
      label="Email"
      type="email"
      placeholder="Enter your email"
      [(ngModel)]="email"
      [error]="emailError"
      required
    ></adu-input>
  `
})
```

**Props:**
- `label`: string
- `type`: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
- `placeholder`: string
- `size`: 'sm' | 'md' | 'lg'
- `error`: string
- `hint`: string
- `icon`: string
- `required`: boolean
- `disabled`: boolean
- `readonly`: boolean

### Card Component

Flexible card container with optional header and footer.

```typescript
import { CardComponent } from 'angular-dev-utils';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CardComponent],
  template: `
    <adu-card [shadow]="'md'" [hoverable]="true" [hasHeader]="true" [hasFooter]="true">
      <div card-header>
        <h3>Card Title</h3>
      </div>
      
      <p>Card content goes here</p>
      
      <div card-footer>
        <button>Action</button>
      </div>
    </adu-card>
  `
})
```

**Props:**
- `shadow`: 'none' | 'sm' | 'md' | 'lg' | 'xl'
- `hoverable`: boolean
- `padding`: 'compact' | 'normal' | 'spacious'
- `hasHeader`: boolean
- `hasFooter`: boolean

### Modal Component

Two ways to use modals: Component-based or Service-based.

**Component-based:**

```typescript
import { ModalComponent } from 'angular-dev-utils';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ModalComponent],
  template: `
    <adu-modal
      [(isOpen)]="showModal"
      title="My Modal"
      size="md"
      (closed)="handleClose()"
    >
      <p>Modal content here</p>
      
      <div modal-footer>
        <button (click)="showModal = false">Close</button>
      </div>
    </adu-modal>
  `
})
```

**Service-based:**

```typescript
import { ModalService } from 'angular-dev-utils';

export class MyComponent {
  constructor(private modalService: ModalService) {}

  openModal() {
    const modalRef = this.modalService.open(MyModalContentComponent, {
      title: 'Dynamic Modal',
      size: 'lg',
      closeOnBackdrop: true
    });

    modalRef.afterClosed().subscribe(result => {
      console.log('Modal closed with:', result);
    });
  }
}
```

**Props:**
- `title`: string
- `size`: 'sm' | 'md' | 'lg' | 'xl' | 'full'
- `closeOnBackdrop`: boolean
- `closeOnEscape`: boolean
- `showCloseButton`: boolean

### Table Component

Feature-rich data table with sorting and pagination.

```typescript
import { TableComponent, TableColumn } from 'angular-dev-utils';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TableComponent],
  template: `
    <adu-table
      [data]="users"
      [columns]="columns"
      [config]="tableConfig"
      (sortChanged)="onSort($event)"
    ></adu-table>
  `
})
export class AppComponent {
  users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
  ];

  columns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, width: '80px' },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: false }
  ];

  tableConfig = {
    sortable: true,
    pageable: true,
    pageSize: 10,
    striped: true,
    hoverable: true
  };
}
```

### Spinner Component

Loading indicator with optional overlay mode.

```typescript
import { SpinnerComponent } from 'angular-dev-utils';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpinnerComponent],
  template: `
    <!-- Inline spinner -->
    <adu-spinner size="md" color="primary"></adu-spinner>

    <!-- Overlay spinner -->
    <adu-spinner
      [overlay]="true"
      size="lg"
      message="Loading..."
    ></adu-spinner>
  `
})
```

**Props:**
- `size`: 'sm' | 'md' | 'lg'
- `color`: 'primary' | 'secondary' | 'white'
- `overlay`: boolean
- `message`: string

## 🔧 Development

### Building the Library

```bash
npm install
npm run build
```

The build output will be in `dist/angular-dev-utils/`.

### Testing Locally

To test the library in your project before publishing:

```bash
# In the library project
npm run build
cd dist/angular-dev-utils
npm link

# In your Angular project
npm link angular-dev-utils
```

### Publishing to npm

```bash
npm run build
cd dist/angular-dev-utils
npm publish
```

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🐛 Issues

If you find a bug or have a feature request, please open an issue on GitHub.
