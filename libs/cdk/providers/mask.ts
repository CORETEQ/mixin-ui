import {
  DestroyRef,
  FactoryProvider,
  inject,
  InjectionToken,
  PLATFORM_ID,
  ProviderToken,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { EMPTY, type Observable } from 'rxjs';
import { EMPTY_FN } from '@mixin-ui/cdk/utils';

/**
 * Universal mask interface for input formatting and validation.
 *
 * @template TModel - The model (unformatted) value type
 * @template TOpt - Configuration options type
 */
export interface XMask<TModel, TOpt extends Record<string, any>> {
  /**
   * Initializes the mask on the target element.
   */
  readonly init: (el: HTMLElement, options?: TOpt) => void;

  /**
   * Performs cleanup tasks for the mask instance.
   */
  readonly destroy: () => void;

  /**
   * Updates the mask configuration with partial options.
   */
  readonly updateOptions: (options: Partial<TOpt>) => void;

  /**
   * Emits raw values on user input only.
   * Does not emit for programmatic value changes.
   */
  readonly valueChanges: Observable<TModel>;

  /**
   * Programmatically sets the raw value and updates the input display.
   */
  readonly setValue: (value: TModel) => void;

  /**
   * Gets the current raw (unformatted) value.
   */
  get modelValue(): TModel;

  /**
   * Gets the current formatted (display) value.
   */
  get maskedValue(): string;

  /**
   * Indicates whether the current mask value satisfies all validation rules.
   * For example, in a date mask it would be true when a complete valid date is entered.
   */
  get completed(): boolean;
}

export const X_MASK = new InjectionToken<XMask<any, Record<string, any>>>('MASK');

/**
 * SSR-safe
 */
class NoopMask implements XMask<any, Record<string, any>> {
  init = EMPTY_FN;
  destroy = EMPTY_FN;
  updateOptions = EMPTY_FN;
  setValue = EMPTY_FN;
  valueChanges = EMPTY;
  maskedValue = '';
  modelValue = null;
  completed = false;
}

export function provideMask<TRaw, TOpt extends Record<string, any>>(
  token: ProviderToken<() => XMask<TRaw, TOpt>>
): FactoryProvider {
  return {
    provide: X_MASK,
    useFactory: (
      isBrowser = isPlatformBrowser(inject(PLATFORM_ID)),
      destroyRef = inject(DestroyRef)
    ) => {
      const mask = isBrowser ? inject(token)() : new NoopMask();
      destroyRef.onDestroy(() => mask.destroy());
      return mask;
    },
  };
}

/**
 * Injects the current mask instance with proper typing
 */
export function injectMask<TRaw, TOpt extends Record<string, any>>(): XMask<TRaw, TOpt> {
  return inject(X_MASK) as XMask<TRaw, TOpt>;
}

// Built-in contracts

// Pattern
export interface XPatternMaskOptions {
  /** A string pattern that defines the expected input format */
  readonly pattern: string;

  /** Show filler characters for empty positions */
  readonly showFiller: boolean;

  /** Character to use as a filler for empty positions */
  readonly fillerChar: string;
}

const defaultPatternOptions: XPatternMaskOptions = {
  pattern: '',
  showFiller: true,
  fillerChar: '_',
};

export const X_PATTERN_MASK_OPTIONS = new InjectionToken<XPatternMaskOptions>(
  'PATTERN_MASK_OPTIONS',
  { factory: () => defaultPatternOptions }
);

// Number
export interface XNumberMaskOptions {
  /** Thousands separator character */
  readonly thousandsSeparator: string;

  /** Decimal separator character */
  readonly decimalSeparator: string;

  /** Number of decimal places to display */
  readonly decimalScale: number;

  /** Remove leading zeros (000123 → 123) */
  readonly normalizeZeros: boolean;

  /** Add trailing zeros to match decimalScale (12.5 → 12.50) */
  readonly padDecimals: boolean;

  /** Minimum allowed value */
  readonly min: number;

  /** Maximum allowed value */
  readonly max: number;

  /** Text prefix (e.g., "$") */
  readonly prefix?: string;

  /** Text suffix (e.g., "%") */
  readonly suffix?: string;
}

const defaultNumberOptions: XNumberMaskOptions = {
  min: Number.MIN_SAFE_INTEGER,
  max: Number.MAX_SAFE_INTEGER,
  thousandsSeparator: ' ',
  decimalSeparator: ',',
  decimalScale: 0,
  normalizeZeros: true,
  padDecimals: true,
};

export const X_NUMBER_MASK_OPTIONS = new InjectionToken<XNumberMaskOptions>('NUMBER_MASK_OPTIONS', {
  factory: () => defaultNumberOptions,
});

// Date
export interface XDateMaskOptions extends XPatternMaskOptions {
  /**
   * Automatically fix invalid date parts when possible,
   * For example, converting '33' to '03' for days
   */
  readonly autofix: boolean;

  /** Minimum allowed date value */
  readonly min: Date;

  /** Maximum allowed date value */
  readonly max: Date;
}

const defaultDateOptions: XDateMaskOptions = {
  min: new Date(1900, 0, 1),
  max: new Date(2100, 11, 31),
  pattern: 'dd/MM/yyyy',
  autofix: true,
  showFiller: false,
  fillerChar: '_',
};

export const X_DATE_MASK_OPTIONS = new InjectionToken<XDateMaskOptions>('DATE_MASK_OPTIONS', {
  factory: () => defaultDateOptions,
});
