import { NavigationEnd } from '@angular/router';
import { fromRouterEvent } from '@mixin-ui/cdk';

const navigationEnd = fromRouterEvent(NavigationEnd);

navigationEnd.subscribe(console.log);
// Results in:
// A NavigationEnd event object logged to the console every time
// the Angular Router emits a NavigationEnd event during navigation.
