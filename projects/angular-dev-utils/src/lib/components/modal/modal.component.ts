import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'adu-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="adu-modal-wrapper" *ngIf="isOpen" (click)="onBackdropClick()">
      <div [class]="modalClasses" (click)="$event.stopPropagation()">
        <button 
          *ngIf="showCloseButton"
          class="adu-modal-close" 
          (click)="close()"
          aria-label="Close modal"
        >
          ×
        </button>

        <div *ngIf="title" class="adu-modal-title">
          {{ title }}
        </div>

        <div class="adu-modal-body">
          <ng-content></ng-content>
        </div>

        <div *ngIf="hasFooter" class="adu-modal-footer">
          <ng-content select="[modal-footer]"></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .adu-modal-wrapper {
      @apply fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fadeIn;
    }

    .adu-modal-content {
      @apply relative bg-white rounded-lg shadow-xl animate-slideUp max-h-[90vh] overflow-y-auto;
    }

    .adu-modal-sm {
      @apply w-full max-w-sm;
    }

    .adu-modal-md {
      @apply w-full max-w-md;
    }

    .adu-modal-lg {
      @apply w-full max-w-2xl;
    }

    .adu-modal-xl {
      @apply w-full max-w-4xl;
    }

    .adu-modal-full {
      @apply w-full h-full max-w-none rounded-none;
    }

    .adu-modal-close {
      @apply absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl font-light leading-none transition-colors;
      @apply w-8 h-8 flex items-center justify-center;
    }

    .adu-modal-title {
      @apply px-6 py-4 text-xl font-semibold text-gray-900 border-b border-gray-200;
    }

    .adu-modal-body {
      @apply px-6 py-4;
    }

    .adu-modal-footer {
      @apply px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-2;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .animate-fadeIn {
      animation: fadeIn 0.2s ease-out;
    }

    .animate-slideUp {
      animation: slideUp 0.3s ease-out;
    }
  `]
})
export class ModalComponent {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md';
  @Input() closeOnBackdrop = true;
  @Input() showCloseButton = true;
  @Input() hasFooter = false;

  @Output() closed = new EventEmitter<void>();

  get modalClasses(): string {
    return ['adu-modal-content', `adu-modal-${this.size}`].join(' ');
  }

  close(): void {
    this.isOpen = false;
    this.closed.emit();
  }

  onBackdropClick(): void {
    if (this.closeOnBackdrop) {
      this.close();
    }
  }
}
