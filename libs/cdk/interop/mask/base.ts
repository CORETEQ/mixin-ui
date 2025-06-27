import {
  distinctUntilChanged,
  filter,
  Observable,
  ReplaySubject,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import type { InputMask } from 'imask';
import type { FactoryArg, UpdateOpts } from 'imask/masked/factory';
import IMask from 'imask/holder';

import { XMask } from '@mixin-ui/cdk/providers';

export class IMaskImpl<TRaw, TOpt extends Record<string, any>> implements XMask<TRaw, TOpt> {
  static readonly Mask = IMask;

  readonly #init$ = new ReplaySubject<void>(1);
  readonly #destroy$ = new Subject<void>();

  #mask: InputMask<FactoryArg> | null = null;
  #options: TOpt;
  #modelUpdating = false;

  constructor(
    private readonly adapter: (options: TOpt) => FactoryArg,
    private readonly options: TOpt
  ) {
    this.#options = { ...options };
  }

  get rawValue(): TRaw {
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
      return new Observable<TRaw>(subscriber => {
        const updateFn = () => subscriber.next(this.rawValue);
        this.#mask?.on('accept', updateFn);
        return () => this.#mask?.off('accept', updateFn);
      });
    }),
    distinctUntilChanged(),
    filter(() => !this.#modelUpdating),
    takeUntil(this.#destroy$)
  );

  init(el: HTMLElement): void {
    try {
      this.#mask = IMask(el, this.adapter(this.options));
    } catch {
      throw new Error('Mask initialization failed');
    }
    this.#init$.next();
  }

  setValue(value: TRaw): void {
    this.updateInternalValue(() => {
      if (!this.#mask) {
        return;
      }

      if (value && typeof value === 'object') {
        this.#mask.typedValue = value;
      } else {
        this.#mask.unmaskedValue = String(value);
      }
    });
  }

  updateOptions(options: Partial<TOpt>): void {
    this.#options = { ...this.#options, ...options };
    this.#mask?.updateOptions(this.adapter(this.#options) as UpdateOpts<FactoryArg>);
  }

  destroy(): void {
    this.#destroy$.next();
    this.#mask?.destroy();
    this.#mask = null;
  }

  private updateInternalValue(fn: () => void): void {
    this.#modelUpdating = true;
    try {
      fn();
    } finally {
      this.#modelUpdating = false;
    }
  }
}
