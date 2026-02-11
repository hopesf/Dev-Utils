import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputType, InputSize } from '../../models/types';

@Component({
  selector: 'adu-input',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ],
  template: `
    <div class="adu-input-wrapper">
      <label *ngIf="label" [for]="id" class="adu-input-label">
        {{ label }}
        <span *ngIf="required" class="text-red-500">*</span>
      </label>
      
      <div class="relative">
        <input
          [id]="id"
          [type]="type"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [readonly]="readonly"
          [value]="value"
          [class]="inputClasses"
          (input)="onInputChange($event)"
          (blur)="onTouched()"
        />
        <span *ngIf="icon" class="adu-input-icon">{{ icon }}</span>
      </div>

      <p *ngIf="error" class="adu-input-error">{{ error }}</p>
      <p *ngIf="hint && !error" class="adu-input-hint">{{ hint }}</p>
    </div>
  `,
  styles: [`
    .adu-input-wrapper {
      @apply w-full;
    }

    .adu-input-label {
      @apply block text-sm font-medium text-gray-700 mb-1;
    }

    .adu-input {
      @apply w-full rounded-lg border border-gray-300 bg-white text-gray-900 transition-colors duration-200;
      @apply focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent;
      @apply disabled:bg-gray-100 disabled:cursor-not-allowed;
      @apply placeholder:text-gray-400;
    }

    .adu-input-sm {
      @apply px-3 py-1.5 text-sm;
    }

    .adu-input-md {
      @apply px-4 py-2 text-base;
    }

    .adu-input-lg {
      @apply px-5 py-3 text-lg;
    }

    .adu-input-error-state {
      @apply border-red-500 focus:ring-red-500;
    }

    .adu-input-icon {
      @apply absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none;
    }

    .adu-input-error {
      @apply mt-1 text-sm text-red-600;
    }

    .adu-input-hint {
      @apply mt-1 text-sm text-gray-500;
    }
  `]
})
export class InputComponent implements ControlValueAccessor {
  @Input() id = `adu-input-${Math.random().toString(36).substr(2, 9)}`;
  @Input() label = '';
  @Input() type: InputType = 'text';
  @Input() placeholder = '';
  @Input() size: InputSize = 'md';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() error = '';
  @Input() hint = '';
  @Input() icon = '';

  value = '';
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  get inputClasses(): string {
    const classes = ['adu-input', `adu-input-${this.size}`];
    
    if (this.error) {
      classes.push('adu-input-error-state');
    }

    if (this.icon) {
      classes.push('pr-10');
    }

    return classes.join(' ');
  }

  onInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
