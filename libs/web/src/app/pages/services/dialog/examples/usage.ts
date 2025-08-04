@Component({ ... })
export class Usage {
  readonly #dialog = inject(XDialog);

  open() {
    this.#dialog
      .open(SomeComponent, { data: 'input' })
      .subscribe(output => console.log(output));
  }
}
