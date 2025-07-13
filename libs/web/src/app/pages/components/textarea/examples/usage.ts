@Component({
  template: `
    <textarea x-textarea></textarea>
  `
})
export class Usage {
  readonly value = signal('');
}
