export function isTabOut(e: KeyboardEvent): boolean {
  return e.key === 'Tab' || (e.shiftKey && e.key === 'Tab');
}
