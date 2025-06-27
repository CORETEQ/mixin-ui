import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  contentChild,
  ElementRef,
  inject,
  input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { filter, fromEvent, map, of, switchMap } from 'rxjs';
import { eventSelf } from '@mixin-ui/cdk';
import { X_SLOT } from '@mixin-ui/kit/directives';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'x-collapsible',
  styleUrl: './collapsible.scss',
  templateUrl: './collapsible.html',
  imports: [NgTemplateOutlet],
  host: {
    role: 'region',
    class: 'x-collapsible',
    '[class.x-opened]': 'open()',
  },
})
export class XCollapsible {
  readonly #el = inject(ElementRef).nativeElement;

  readonly slot = contentChild(X_SLOT, { read: TemplateRef });
  readonly open = input(false, { transform: booleanAttribute });
  readonly shown = toSignal(
    toObservable(this.open).pipe(
      switchMap(value =>
        value
          ? of(value)
          : fromEvent<TransitionEvent>(this.#el, 'transitionend').pipe(
              eventSelf(),
              filter(e => e.propertyName === 'grid-template-rows'),
              map(() => value)
            )
      )
    )
  );
}
