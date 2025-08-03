import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  concat,
  debounceTime,
  EMPTY,
  fromEvent,
  map,
  startWith,
  switchMap,
  take,
  timer,
} from 'rxjs';
import { fromAfterNextRender } from '@mixin-ui/cdk';
import { DocsFragmentsService } from '@/docs/services';
import { toKebab } from '@/docs/utils';

@Component({
  selector: 'h2, h3',
  template: `
    <a
      routerLink="."
      class="hover:underline decoration-1 underline-offset-4 decoration-gray-200"
      [fragment]="fragment()"
    >
      <ng-content>Heading {{ level }}</ng-content>
    </a>
  `,
  host: {
    '[attr.id]': 'fragment()',
    '[attr.data-text]': 'textContent()',
    '[class.spotlighted]': 'spotlighted()',
  },
  imports: [RouterLink],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsFragment implements AfterContentInit {
  private readonly route = inject(ActivatedRoute);
  private readonly el = inject(ElementRef<HTMLHeadingElement>).nativeElement;
  private readonly fragments = inject(DocsFragmentsService);

  id = input<string>();

  readonly textContent = signal('');
  readonly fragment = computed(() => this.id() || toKebab(this.textContent().trim()));
  readonly spotlighted = toSignal(
    fromAfterNextRender().pipe(
      switchMap(() => {
        if (this.fragment() !== this.route.snapshot.fragment) {
          return EMPTY;
        }

        return concat(
          fromEvent(window, 'scroll').pipe(startWith(true), debounceTime(35), take(1)),
          timer(2000).pipe(map(() => false))
        );
      })
    )
  );

  ngAfterContentInit(): void {
    this.textContent.set(this.el.textContent);

    this.fragments.next({
      level: this.level,
      title: this.textContent(),
      fragment: this.fragment(),
      relativeTo: this.route,
      routerLink: '.',
    });
  }

  protected get level(): number {
    return Number(this.el.tagName.replace('H', ''));
  }
}
