import { hasModifierKey } from '@angular/cdk/keycodes';

export function isPureEscape(e: KeyboardEvent): boolean {
  return e.key === 'Escape' && !e.defaultPrevented && !hasModifierKey(e);
}
