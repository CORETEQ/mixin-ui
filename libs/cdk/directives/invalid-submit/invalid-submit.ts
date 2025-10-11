import { Directive, ElementRef, inject, input } from '@angular/core';
import { AbstractControl, ControlContainer } from '@angular/forms';
import { findFirstInvalidControl, getFocusableElement } from '@mixin-ui/cdk/utils';

const NG_INVALID_CONTROL = '.ng-invalid:not(form)';

@Directive({
  selector: '[x-invalid-submit]',
  exportAs: 'x-invalid-submit',
  host: {
    '(submit)': 'handleSubmit()',
  },
})
export class XInvalidSubmit {
  readonly #container = inject(ControlContainer, { self: true, optional: true });
  readonly #el = inject(ElementRef<HTMLElement>).nativeElement;

  readonly scrollOptions = input<ScrollIntoViewOptions | null>(
    { block: 'center', behavior: 'smooth' },
    { alias: 'x-invalid-submit-scroll-options' }
  );

  /** @internal */
  handleSubmit(): void {
    if (this.control?.valid) {
      return;
    }

    const invalidRootEl = this.#el.querySelector(NG_INVALID_CONTROL);

    if (!invalidRootEl) {
      return;
    }

    const focusableEl = getFocusableElement(invalidRootEl);

    if (focusableEl) {
      this.focus(focusableEl);

      if (this.control) {
        findFirstInvalidControl(this.control)?.markAsTouched();
      }
    }
  }

  get control(): AbstractControl | null {
    return this.#container?.control || null;
  }

  private focus(el: HTMLElement): void {
    const scrollOptions = this.scrollOptions();

    el.focus({ preventScroll: !!scrollOptions });

    if (scrollOptions) {
      el.scrollIntoView(scrollOptions);
    }
  }
}
