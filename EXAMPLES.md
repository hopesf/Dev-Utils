# Usage Examples

## Button Examples

### Basic Buttons

```typescript
import { Component } from '@angular/core';
import { ButtonComponent } from 'angular-dev-utils';

@Component({
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <div class="space-y-2">
      <adu-button variant="primary">Primary Button</adu-button>
      <adu-button variant="secondary">Secondary Button</adu-button>
      <adu-button variant="success">Success Button</adu-button>
      <adu-button variant="danger">Danger Button</adu-button>
      <adu-button variant="warning">Warning Button</adu-button>
      <adu-button variant="ghost">Ghost Button</adu-button>
    </div>
  `
})
export class ButtonExamples {}
```

### Button Sizes

```typescript
<adu-button size="sm">Small</adu-button>
<adu-button size="md">Medium</adu-button>
<adu-button size="lg">Large</adu-button>
```

### Loading State

```typescript
<adu-button [loading]="isLoading" (clicked)="submit()">
  Submit Form
</adu-button>
```

## Input Examples

### Basic Input

```typescript
import { Component } from '@angular/core';
import { InputComponent } from 'angular-dev-utils';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [InputComponent, FormsModule],
  template: `
    <adu-input
      label="Email Address"
      type="email"
      placeholder="you@example.com"
      [(ngModel)]="email"
      required
    ></adu-input>
  `
})
export class InputExamples {
  email = '';
}
```

### Input with Validation

```typescript
<adu-input
  label="Password"
  type="password"
  [(ngModel)]="password"
  [error]="passwordError"
  hint="Must be at least 8 characters"
  required
></adu-input>
```

## Card Examples

### Basic Card

```typescript
import { Component } from '@angular/core';
import { CardComponent, ButtonComponent } from 'angular-dev-utils';

@Component({
  standalone: true,
  imports: [CardComponent, ButtonComponent],
  template: `
    <adu-card shadow="md" [hoverable]="true">
      <h2 class="text-xl font-bold mb-2">Card Title</h2>
      <p class="text-gray-600">Card content goes here...</p>
    </adu-card>
  `
})
export class CardExamples {}
```

### Card with Header and Footer

```typescript
<adu-card [hasHeader]="true" [hasFooter]="true">
  <div card-header>
    <h3 class="font-bold">User Profile</h3>
  </div>
  
  <div>
    <p>Name: John Doe</p>
    <p>Email: john@example.com</p>
  </div>
  
  <div card-footer class="flex gap-2">
    <adu-button size="sm" variant="primary">Edit</adu-button>
    <adu-button size="sm" variant="ghost">Cancel</adu-button>
  </div>
</adu-card>
```

## Modal Examples

### Component-based Modal

```typescript
import { Component } from '@angular/core';
import { ModalComponent, ButtonComponent } from 'angular-dev-utils';

@Component({
  standalone: true,
  imports: [ModalComponent, ButtonComponent],
  template: `
    <adu-button (clicked)="showModal = true">Open Modal</adu-button>
    
    <adu-modal
      [(isOpen)]="showModal"
      title="Confirm Action"
      size="md"
      (closed)="onClose()"
    >
      <p>Are you sure you want to proceed?</p>
      
      <div modal-footer class="flex gap-2">
        <adu-button variant="primary" (clicked)="confirm()">Confirm</adu-button>
        <adu-button variant="ghost" (clicked)="showModal = false">Cancel</adu-button>
      </div>
    </adu-modal>
  `
})
export class ModalExamples {
  showModal = false;
  
  confirm() {
    console.log('Confirmed!');
    this.showModal = false;
  }
  
  onClose() {
    console.log('Modal closed');
  }
}
```

### Service-based Modal

```typescript
import { Component } from '@angular/core';
import { ModalService, ButtonComponent } from 'angular-dev-utils';

// Modal content component
@Component({
  standalone: true,
  template: `
    <div class="p-4">
      <h3 class="text-lg font-bold mb-4">Dynamic Content</h3>
      <p>This is a dynamically created modal!</p>
    </div>
  `
})
export class DynamicModalContent {}

@Component({
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <adu-button (clicked)="openModal()">Open Dynamic Modal</adu-button>
  `
})
export class ServiceModalExample {
  constructor(private modalService: ModalService) {}
  
  openModal() {
    const modalRef = this.modalService.open(DynamicModalContent, {
      title: 'Dynamic Modal',
      size: 'lg',
      closeOnBackdrop: true
    });
    
    modalRef.afterClosed().subscribe(result => {
      console.log('Modal closed with result:', result);
    });
  }
}
```

## Table Examples

### Basic Table

```typescript
import { Component } from '@angular/core';
import { TableComponent, TableColumn } from 'angular-dev-utils';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

@Component({
  standalone: true,
  imports: [TableComponent],
  template: `
    <adu-table
      [data]="users"
      [columns]="columns"
      [config]="tableConfig"
    ></adu-table>
  `
})
export class TableExamples {
  users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive' }
  ];
  
  columns: TableColumn<User>[] = [
    { key: 'id', label: 'ID', sortable: true, width: '80px' },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'status', label: 'Status', sortable: true }
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

## Spinner Examples

### Inline Spinner

```typescript
import { Component } from '@angular/core';
import { SpinnerComponent } from 'angular-dev-utils';

@Component({
  standalone: true,
  imports: [SpinnerComponent],
  template: `
    <div class="flex items-center gap-2">
      <adu-spinner size="sm" color="primary"></adu-spinner>
      <span>Loading...</span>
    </div>
  `
})
export class SpinnerExamples {}
```

### Overlay Spinner

```typescript
<adu-spinner
  *ngIf="isLoading"
  [overlay]="true"
  size="lg"
  message="Please wait..."
></adu-spinner>
```

## Complete Form Example

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  CardComponent,
  InputComponent,
  ButtonComponent,
  SpinnerComponent
} from 'angular-dev-utils';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardComponent,
    InputComponent,
    ButtonComponent,
    SpinnerComponent
  ],
  template: `
    <adu-card shadow="lg" [hasHeader]="true" [hasFooter]="true">
      <div card-header>
        <h2 class="text-2xl font-bold">User Registration</h2>
      </div>
      
      <div class="space-y-4">
        <adu-input
          label="Full Name"
          type="text"
          placeholder="John Doe"
          [(ngModel)]="form.name"
          [error]="errors.name"
          required
        ></adu-input>
        
        <adu-input
          label="Email"
          type="email"
          placeholder="john@example.com"
          [(ngModel)]="form.email"
          [error]="errors.email"
          required
        ></adu-input>
        
        <adu-input
          label="Password"
          type="password"
          placeholder="••••••••"
          [(ngModel)]="form.password"
          [error]="errors.password"
          hint="At least 8 characters"
          required
        ></adu-input>
      </div>
      
      <div card-footer class="flex justify-end gap-2">
        <adu-button variant="ghost" (clicked)="cancel()">Cancel</adu-button>
        <adu-button
          variant="primary"
          [loading]="isSubmitting"
          (clicked)="submit()"
        >
          Register
        </adu-button>
      </div>
    </adu-card>
    
    <adu-spinner
      *ngIf="isSubmitting"
      [overlay]="true"
      message="Creating account..."
    ></adu-spinner>
  `
})
export class RegistrationForm {
  form = {
    name: '',
    email: '',
    password: ''
  };
  
  errors = {
    name: '',
    email: '',
    password: ''
  };
  
  isSubmitting = false;
  
  async submit() {
    if (this.validate()) {
      this.isSubmitting = true;
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Form submitted:', this.form);
        // Handle success
      } catch (error) {
        console.error('Error:', error);
      } finally {
        this.isSubmitting = false;
      }
    }
  }
  
  validate(): boolean {
    let isValid = true;
    this.errors = { name: '', email: '', password: '' };
    
    if (!this.form.name) {
      this.errors.name = 'Name is required';
      isValid = false;
    }
    
    if (!this.form.email) {
      this.errors.email = 'Email is required';
      isValid = false;
    } else if (!this.isValidEmail(this.form.email)) {
      this.errors.email = 'Invalid email address';
      isValid = false;
    }
    
    if (!this.form.password) {
      this.errors.password = 'Password is required';
      isValid = false;
    } else if (this.form.password.length < 8) {
      this.errors.password = 'Password must be at least 8 characters';
      isValid = false;
    }
    
    return isValid;
  }
  
  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  cancel() {
    this.form = { name: '', email: '', password: '' };
    this.errors = { name: '', email: '', password: '' };
  }
}
```
