import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonVariant, ButtonSize } from '../../models/types';

@Component({
  selector: 'adu-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      [class]="buttonClasses"
      (click)="handleClick($event)"
    >
      <span *ngIf="loading" class="adu-button-spinner"></span>
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    .adu-button {
      @apply inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed;
    }

    /* Variants */
    .adu-button-primary {
      @apply bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500;
    }

    .adu-button-secondary {
      @apply bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500;
    }

    .adu-button-success {
      @apply bg-green-600 text-white hover:bg-green-700 focus:ring-green-500;
    }

    .adu-button-danger {
      @apply bg-red-600 text-white hover:bg-red-700 focus:ring-red-500;
    }

    .adu-button-warning {
      @apply bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500;
    }

    .adu-button-ghost {
      @apply bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500 border border-gray-300;
    }

    /* Sizes */
    .adu-button-sm {
      @apply px-3 py-1.5 text-sm;
    }

    .adu-button-md {
      @apply px-4 py-2 text-base;
    }

    .adu-button-lg {
      @apply px-6 py-3 text-lg;
    }

    /* Loading Spinner */
    .adu-button-spinner {
      @apply inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin;
    }
  `]
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() fullWidth = false;

  @Output() clicked = new EventEmitter<MouseEvent>();

  get buttonClasses(): string {
    const classes = ['adu-button', `adu-button-${this.variant}`, `adu-button-${this.size}`];
    
    if (this.fullWidth) {
      classes.push('w-full');
    }

    return classes.join(' ');
  }

  handleClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }
}
