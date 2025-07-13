import {
  Directive,
  forwardRef,
  inject,
  InjectionToken,
  input,
  Pipe,
  PipeTransform,
  Provider,
  TemplateRef,
  Type,
} from '@angular/core';

const __DEFAULT_NAME__ = new InjectionToken('', { factory: () => '' });

export const X_SLOT = new InjectionToken<XSlot>('SLOT');

@Directive({
  selector: 'ng-template[x-slot]',
  providers: [
    {
      provide: X_SLOT,
      useExisting: forwardRef(() => XSlot),
    },
  ],
})
export class XSlot {
  readonly t = inject(TemplateRef);
  readonly n = input(inject(__DEFAULT_NAME__), { alias: 'x-slot' });
}

@Pipe({ name: 'asRecord' })
export class XSlotsPipe implements PipeTransform {
  transform = (slots: readonly XSlot[]) => Object.fromEntries(slots.map(s => [s.n(), s.t]));
}

export function provideNamedSlot(name: string, slot: Type<XSlot>): Provider[] {
  return [
    {
      provide: __DEFAULT_NAME__,
      useValue: name,
    },
    {
      provide: X_SLOT,
      useExisting: slot,
    },
  ];
}
