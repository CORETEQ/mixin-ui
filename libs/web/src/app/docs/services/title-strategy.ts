import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { environment } from '../../env';

@Injectable()
export class DocsTitleStrategy extends TitleStrategy {
  readonly #title = inject(Title);

  updateTitle(snapshot: RouterStateSnapshot): void {
    if (snapshot.url === '/') {
      this.#title.setTitle(environment.orgName);
    } else {
      this.#title.setTitle(`${environment.orgName}: ${this.buildTitle(snapshot)}`);
    }
  }
}
