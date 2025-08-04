import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DocsPageFragment } from '../types';

@Injectable({ providedIn: 'root' })
export class DocsPageService extends BehaviorSubject<{ fragments: DocsPageFragment[] }> {
  constructor() {
    super({ fragments: [] });
  }
}
