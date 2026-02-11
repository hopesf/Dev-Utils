import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerSize, SpinnerColor } from '../../models/types';

@Component({
  selector: 'adu-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="overlay" class="adu-spinner-overlay">
      <div [class]="spinnerClasses"></div>
      <p *ngIf="message" class="adu-spinner-message">{{ message }}</p>
    </div>

    <div *ngIf="!overlay" [class]="spinnerClasses"></div>
  `,
  styles: [`
    .adu-spinner {
      @apply inline-block border-4 border-t-transparent rounded-full animate-spin;
    }

    .adu-spinner-sm {
      @apply w-4 h-4 border-2;
    }

    .adu-spinner-md {
      @apply w-8 h-8 border-4;
    }

    .adu-spinner-lg {
      @apply w-12 h-12 border-4;
    }

    .adu-spinner-primary {
      @apply border-blue-600 border-t-transparent;
    }

    .adu-spinner-secondary {
      @apply border-gray-600 border-t-transparent;
    }

    .adu-spinner-white {
      @apply border-white border-t-transparent;
    }

    .adu-spinner-overlay {
      @apply fixed inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center z-50;
    }

    .adu-spinner-message {
      @apply mt-4 text-white text-lg font-medium;
    }
  `]
})
export class SpinnerComponent {
  @Input() size: SpinnerSize = 'md';
  @Input() color: SpinnerColor = 'primary';
  @Input() overlay = false;
  @Input() message = '';

  get spinnerClasses(): string {
    return ['adu-spinner', `adu-spinner-${this.size}`, `adu-spinner-${this.color}`].join(' ');
  }
}
