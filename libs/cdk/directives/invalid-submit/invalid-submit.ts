import { Directive, ElementRef, inject } from '@angular/core';
import { AbstractControl, ControlContainer } from '@angular/forms';
import { findFirstInvalidControl, getFocusableElement } from '@mixin-ui/cdk/utils';
import { X_INVALID_SUBMIT_OPTIONS } from './options';

const NG_INVALID_CONTROL = '.ng-invalid:not(form)';

@Directive({
  selector: '[x-invalid-submit]',
  exportAs: 'x-invalid-submit',
  host: {
    '(submit)': 'handleSubmit()',
  },
})
export class XInvalidSubmit {
  readonly #opt = inject(X_INVALID_SUBMIT_OPTIONS);
  readonly #el = inject(ElementRef<HTMLElement>).nativeElement;
  readonly #container = inject(ControlContainer, { self: true, optional: true });

  /** @internal */
  handleSubmit(): void {
    if (this.control?.valid) {
      return;
    }

    const invalidRoot = this.#el.querySelector(NG_INVALID_CONTROL);

    if (!invalidRoot) {
      return;
    }

    const closestFocusable = getFocusableElement(invalidRoot);

    if (closestFocusable) {
      this.focus(closestFocusable);
    }

    if (this.control) {
      this.markControls(this.control);
    }
  }

  get control(): AbstractControl | null {
    return this.#container?.control || null;
  }

  private focus(el: HTMLElement): void {
    const scrollOptions = this.#opt.scrollOptions;

    el.focus({ preventScroll: !!scrollOptions });

    if (scrollOptions) {
      el.scrollIntoView(scrollOptions);
    }
  }

  private markControls(control: AbstractControl): void {
    switch (this.#opt.markAsTouched) {
      case 'all':
        control.markAllAsTouched();
        break;
      case 'first':
        findFirstInvalidControl(control)?.markAsTouched();
        break;
      case 'none':
        break;
    }
  }
}
