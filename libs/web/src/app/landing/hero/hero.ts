import { ChangeDetectionStrategy, Component, signal, ViewEncapsulation } from '@angular/core';
import { XIcon } from '@mixin-ui/kit';
import { RouterLink } from '@angular/router';

@Component({
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-hero',
  styleUrl: './hero.scss',
  templateUrl: './hero.html',
  imports: [XIcon, RouterLink],
})
export class Hero {
  readonly showPreview = signal(false);
  readonly loading = signal(false);

  show(): void {
    this.loading.set(true);
    setTimeout(() => {
      this.showPreview.set(true);
      this.loading.set(false);
    }, 800);
  }
}
