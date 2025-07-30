import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

const ORG_NAME = 'Mixin UI';

@Injectable()
export class DocsTitleStrategy extends TitleStrategy {
  readonly #title = inject(Title);

  updateTitle(snapshot: RouterStateSnapshot): void {
    if (snapshot.url === '/') {
      this.#title.setTitle(ORG_NAME);
    } else {
      this.#title.setTitle(`${ORG_NAME}: ${this.buildTitle(snapshot)}`);
    }
  }
}
