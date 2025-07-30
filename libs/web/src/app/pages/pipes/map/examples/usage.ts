@Component({
  template: `
    {{ value | map: multiply: 100 }}
  `
})
export class Usage {
  readonly value = 1;
  readonly multiply = (value: number, scale: number) => value * scale;
}
