@Component({ ... })
export class Usage {
  readonly #theme = inject(XTheme);

  set(theme: 'dark' | 'light') {
    this.#theme.set(theme);
  }
}
