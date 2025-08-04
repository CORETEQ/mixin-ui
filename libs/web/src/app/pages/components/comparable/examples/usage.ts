@Component({
  template: `
    <x-comparable>
      <img x-slot="start" src="start.png" alt="start" />
      <img x-slot="end" src="end.png" alt="end" />
    </x-comparable>
  `
})
export class Usage {}
