import { Injectable, ComponentRef, ApplicationRef, createComponent, EnvironmentInjector, Type } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalConfig } from '../models/types';

export interface ModalRef<T = any> {
  close: (result?: T) => void;
  afterClosed: () => Subject<T | undefined>;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalComponentRef: ComponentRef<any> | null = null;
  private closeSubject = new Subject<any>();

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) { }

  open<T, R = any>(component: Type<T>, config: ModalConfig = {}): ModalRef<R> {
    // Close existing modal if any
    if (this.modalComponentRef) {
      this.close();
    }

    // Create modal wrapper
    const modalWrapper = document.createElement('div');
    modalWrapper.className = this.getModalWrapperClasses(config);

    // Create backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'adu-modal-backdrop';
    if (config.closeOnBackdrop !== false) {
      backdrop.onclick = () => this.close();
    }

    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = this.getModalContentClasses(config);
    modalContent.onclick = (e) => e.stopPropagation();

    // Create close button if needed
    if (config.showCloseButton !== false) {
      const closeBtn = document.createElement('button');
      closeBtn.className = 'adu-modal-close';
      closeBtn.innerHTML = '×';
      closeBtn.onclick = () => this.close();
      modalContent.appendChild(closeBtn);
    }

    // Add title if provided
    if (config.title) {
      const titleEl = document.createElement('div');
      titleEl.className = 'adu-modal-title';
      titleEl.textContent = config.title;
      modalContent.appendChild(titleEl);
    }

    // Create component container
    const componentContainer = document.createElement('div');
    componentContainer.className = 'adu-modal-body';
    modalContent.appendChild(componentContainer);

    // Assemble modal
    modalWrapper.appendChild(backdrop);
    modalWrapper.appendChild(modalContent);
    document.body.appendChild(modalWrapper);

    // Create and attach component
    this.modalComponentRef = createComponent(component, {
      environmentInjector: this.injector,
      hostElement: componentContainer
    });

    this.appRef.attachView(this.modalComponentRef.hostView);

    // Handle ESC key
    if (config.closeOnEscape !== false) {
      const escHandler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          this.close();
          document.removeEventListener('keydown', escHandler);
        }
      };
      document.addEventListener('keydown', escHandler);
    }

    return {
      close: (result?: R) => this.close(result),
      afterClosed: () => this.closeSubject as Subject<R | undefined>
    };
  }

  close(result?: any): void {
    if (this.modalComponentRef) {
      this.appRef.detachView(this.modalComponentRef.hostView);
      this.modalComponentRef.destroy();
      this.modalComponentRef = null;

      // Remove modal from DOM
      const modals = document.querySelectorAll('.adu-modal-wrapper');
      modals.forEach(modal => modal.remove());

      this.closeSubject.next(result);
      this.closeSubject.complete();
      this.closeSubject = new Subject<any>();
    }
  }

  private getModalWrapperClasses(config: ModalConfig): string {
    return 'adu-modal-wrapper';
  }

  private getModalContentClasses(config: ModalConfig): string {
    const size = config.size || 'md';
    return `adu-modal-content adu-modal-${size}`;
  }
}
