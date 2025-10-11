import {
  afterNextRender,
  booleanAttribute,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  isDevMode,
  numberAttribute,
} from '@angular/core';

@Directive({ selector: '[x-autofocus]' })
export class XAutofocus {
  readonly #el = inject(ElementRef<HTMLElement>).nativeElement;
  readonly #destroyRef = inject(DestroyRef);

  readonly enabled = input(true, { alias: 'x-autofocus', transform: booleanAttribute });
  readonly delay = input(0, { alias: 'x-autofocus-delay', transform: numberAttribute });

  #timeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    afterNextRender(() => {
      this.scheduleFocus();
    });

    this.#destroyRef.onDestroy(() => {
      this.cancelScheduledFocus();
    });
  }

  private scheduleFocus(): void {
    this.cancelScheduledFocus();

    this.#timeoutId = setTimeout(() => {
      this.focusElement();
      this.#timeoutId = null;
    }, this.delay());
  }

  private cancelScheduledFocus(): void {
    if (this.#timeoutId !== null) {
      clearTimeout(this.#timeoutId);
      this.#timeoutId = null;
    }
  }

  private focusElement(): void {
    try {
      this.#el.focus();
    } catch (error) {
      if (isDevMode()) {
        console.warn('Failed to focus element', error);
      }
    }
  }
}
