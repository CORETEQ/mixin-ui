@Component({
  template: `
    <label x-label>
      <button x-checkbox></button>
      Label
    </label>

    <label x-label>
      <button x-switch></button>
      Label
    </label>

    <label x-label>
      Label
      <x-input-mask>
        <input x-control />
      </x-input-mask>
    </label>
  `
})
export class Usage {}
