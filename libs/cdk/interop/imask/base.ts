import {
  distinctUntilChanged,
  filter,
  Observable,
  ReplaySubject,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import IMask from 'imask/holder';
import type { FactoryArg, InputMask } from 'imask';
import type { UpdateOpts } from 'imask/masked/factory';

import type { XMask } from '@mixin-ui/cdk/providers';
import { isObject } from '@mixin-ui/cdk/utils';

export class IMaskImpl<TModel, TOpt extends Record<string, any>> implements XMask<TModel, TOpt> {
  static readonly Mask = IMask;

  readonly #init$ = new ReplaySubject<void>(1);
  readonly #destroy$ = new Subject<void>();

  #mask: InputMask<FactoryArg> | null = null;
  #options: TOpt;
  #modelUpdating = false;
  #optionsUpdating = false;

  constructor(
    private readonly adapter: (options: TOpt) => FactoryArg,
    private readonly options: TOpt
  ) {
    this.#options = { ...options };
  }

  get modelValue(): TModel {
    return this.#mask?.typedValue;
  }

  get maskedValue(): string {
    return this.#mask?.value || '';
  }

  get completed(): boolean {
    return !!this.#mask?.masked?.isComplete;
  }

  readonly valueChanges = this.#init$.pipe(
    switchMap(() => {
      return new Observable<TModel>(subscriber => {
        const updateFn = () => subscriber.next(this.modelValue);
        this.#mask?.on('accept', updateFn);
        return () => this.#mask?.off('accept', updateFn);
      });
    }),
    distinctUntilChanged(),
    filter(() => this.shouldPropagateChanges),
    takeUntil(this.#destroy$)
  );

  init(el: HTMLElement): void {
    try {
      this.#mask = IMask(el, this.adapter(this.options));
    } catch (cause) {
      throw new Error('Mask initialization failed', { cause });
    }
    this.#init$.next();
  }

  setValue(value: TModel): void {
    this.handleModelUpdate(() => {
      if (!this.#mask) {
        return;
      }

      if (isObject(value)) {
        this.#mask.typedValue = value;
      } else {
        this.#mask.unmaskedValue = String(value);
      }
    });
  }

  updateOptions(options: Partial<TOpt>): void {
    this.handleOptionsUpdate(() => {
      this.#options = { ...this.#options, ...options };
      this.#mask?.updateOptions(this.adapter(this.#options) as UpdateOpts<FactoryArg>);
    });
  }

  destroy(): void {
    this.#destroy$.next();
    this.#mask?.destroy();
    this.#mask = null;
  }

  private get shouldPropagateChanges(): boolean {
    if (this.#modelUpdating) {
      return false;
    }

    if (this.#optionsUpdating && this.#mask) {
      const { unmaskedValue, rawInputValue, masked } = this.#mask;

      // exclude https://github.com/uNmAnNeR/imaskjs/blob/master/packages/imask/src/controls/input.ts#L225
      // since updating the options with `lazy: false` causes an undesired emission during control initialization
      // due to a mismatch between the model value and the raw input value with a placeholder.
      return unmaskedValue !== masked.unmaskedValue || rawInputValue !== masked.rawInputValue;
    }

    return true;
  }

  private handleModelUpdate(fn: () => void): void {
    this.#modelUpdating = true;
    try {
      fn();
    } finally {
      this.#modelUpdating = false;
    }
  }

  private handleOptionsUpdate(fn: () => void): void {
    this.#optionsUpdating = true;
    try {
      fn();
    } finally {
      this.#optionsUpdating = false;
    }
  }
}
