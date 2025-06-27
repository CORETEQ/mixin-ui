@Component({ ... })
export class Usage {
  readonly #toaster = inject(XToaster);

  open() {
    this.#toaster.open('I love Mixin! ❤️');
  }
}
