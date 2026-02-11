import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'adu-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="cardClasses">
      <div *ngIf="hasHeader" class="adu-card-header">
        <ng-content select="[card-header]"></ng-content>
      </div>
      
      <div class="adu-card-body">
        <ng-content></ng-content>
      </div>
      
      <div *ngIf="hasFooter" class="adu-card-footer">
        <ng-content select="[card-footer]"></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .adu-card {
      @apply bg-white rounded-lg border border-gray-200 overflow-hidden transition-shadow duration-200;
    }

    .adu-card-hoverable:hover {
      @apply shadow-lg;
    }

    .adu-card-shadow-sm {
      @apply shadow-sm;
    }

    .adu-card-shadow-md {
      @apply shadow-md;
    }

    .adu-card-shadow-lg {
      @apply shadow-lg;
    }

    .adu-card-shadow-xl {
      @apply shadow-xl;
    }

    .adu-card-header {
      @apply px-6 py-4 border-b border-gray-200 bg-gray-50;
    }

    .adu-card-body {
      @apply px-6 py-4;
    }

    .adu-card-body-compact {
      @apply px-4 py-3;
    }

    .adu-card-body-spacious {
      @apply px-8 py-6;
    }

    .adu-card-footer {
      @apply px-6 py-4 border-t border-gray-200 bg-gray-50;
    }
  `]
})
export class CardComponent {
  @Input() shadow: 'none' | 'sm' | 'md' | 'lg' | 'xl' = 'sm';
  @Input() hoverable = false;
  @Input() padding: 'compact' | 'normal' | 'spacious' = 'normal';
  @Input() hasHeader = false;
  @Input() hasFooter = false;

  get cardClasses(): string {
    const classes = ['adu-card'];

    if (this.shadow !== 'none') {
      classes.push(`adu-card-shadow-${this.shadow}`);
    }

    if (this.hoverable) {
      classes.push('adu-card-hoverable');
    }

    return classes.join(' ');
  }

  get bodyClasses(): string {
    const classes = ['adu-card-body'];

    if (this.padding === 'compact') {
      classes.push('adu-card-body-compact');
    } else if (this.padding === 'spacious') {
      classes.push('adu-card-body-spacious');
    }

    return classes.join(' ');
  }
}
