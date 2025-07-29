## 0.0.1-alpha.24 (2025-07-29)

### 🚀 Features

- **cdk:** test schematics ([c727bf1](https://github.com/CORETEQ/mixin-ui/commit/c727bf1))
- **cdk:** test schematics ([bd7a6a5](https://github.com/CORETEQ/mixin-ui/commit/bd7a6a5))

## 0.0.1-alpha.23 (2025-07-29)

### 🚀 Features

- **cdk:** test schematics ([6cae306](https://github.com/CORETEQ/mixin-ui/commit/6cae306))

## 0.0.1-alpha.22 (2025-07-29)

### 🚀 Features

- **cdk:** test schematics ([d4cc726](https://github.com/CORETEQ/mixin-ui/commit/d4cc726))

## 0.0.1-alpha.21 (2025-07-29)

### 🚀 Features

- **cdk:** test schematics ([6b447c4](https://github.com/CORETEQ/mixin-ui/commit/6b447c4))

## 0.0.1-alpha.20 (2025-07-29)

### 🚀 Features

- **cdk:** test schematics ([aeba333](https://github.com/CORETEQ/mixin-ui/commit/aeba333))

## 0.0.1-alpha.19 (2025-07-29)

### 🚀 Features

- **cdk:** update `watch` fn ([d18e79d](https://github.com/CORETEQ/mixin-ui/commit/d18e79d))
- **cdk:** `XDateMaskOptions` remove `autofix` property from public interface ([cc787c0](https://github.com/CORETEQ/mixin-ui/commit/cc787c0))
- **kit:** expose `enabledTabIndex` input for `XSelect` ([6ae895b](https://github.com/CORETEQ/mixin-ui/commit/6ae895b))
- **kit:** remove `value` input from `XCheckbox` ([5964812](https://github.com/CORETEQ/mixin-ui/commit/5964812))

### 🩹 Fixes

- **kit:** schedule mask value update as microtask to fix reactive form directives interop ([b83f4b1](https://github.com/CORETEQ/mixin-ui/commit/b83f4b1))
- **kit:** fix `provideSelectOptions` ([edd51e9](https://github.com/CORETEQ/mixin-ui/commit/edd51e9))

## 0.0.1-alpha.18 (2025-07-25)

### 🚀 Features

- **cdk:** introduce `observe` utility ([df6ede4](https://github.com/CORETEQ/mixin-ui/commit/df6ede4))
- **kit:** rename `handleListboxValue` to `handleListboxSelection` in `XListboxAccessor` interface ([c8241cb](https://github.com/CORETEQ/mixin-ui/commit/c8241cb))
- **kit:** add `useActiveDescendant` property to `XListboxOptions` ([8091113](https://github.com/CORETEQ/mixin-ui/commit/8091113))
- **kit:** improve listbox keyboard navigation ([a7cbd58](https://github.com/CORETEQ/mixin-ui/commit/a7cbd58))
- **kit:** rename `XInput` to `XInputBase` ([b9e8fe7](https://github.com/CORETEQ/mixin-ui/commit/b9e8fe7))

### 🩹 Fixes

- **kit:** fix `XCombobox` popover when state is disabled ([56012af](https://github.com/CORETEQ/mixin-ui/commit/56012af))
- **kit:** exclude disabled options from autocomplete when native value changes ([ce6db95](https://github.com/CORETEQ/mixin-ui/commit/ce6db95))
- **kit:** fix `XInputDate` popover when state is disabled ([5d71d83](https://github.com/CORETEQ/mixin-ui/commit/5d71d83))

## 0.0.1-alpha.17 (2025-07-24)

### 🚀 Features

- **cdk:** implement new overloads for `relatedTo` fn ([2448628](https://github.com/CORETEQ/mixin-ui/commit/2448628))
- **cdk:** update rxjs interop operators ([0afe4ac](https://github.com/CORETEQ/mixin-ui/commit/0afe4ac))
- **kit:** add `wrapNavigation` property to `XListboxOptions` interface ([be1b3e5](https://github.com/CORETEQ/mixin-ui/commit/be1b3e5))
- **kit:** refactor `.x-accordion` css variables names ([7357e47](https://github.com/CORETEQ/mixin-ui/commit/7357e47))
- **kit:** add `handleListboxActiveDescendant` to `XListboxAccessor`, update typing ([36a1452](https://github.com/CORETEQ/mixin-ui/commit/36a1452))
- **kit:** improve combobox aria ([5d66662](https://github.com/CORETEQ/mixin-ui/commit/5d66662))
- **kit:** implement `setDisabled` for `XPopoverTarget` ([60a002b](https://github.com/CORETEQ/mixin-ui/commit/60a002b))

### 🩹 Fixes

- **kit:** fix popover when select is disabled ([51c3960](https://github.com/CORETEQ/mixin-ui/commit/51c3960))

## 0.0.1-alpha.16 (2025-07-22)

### 🚀 Features

- **kit:** improve `createKeyComparator` fn, change the type of key from `string` to `PropertyKey` ([10ac8a2](https://github.com/CORETEQ/mixin-ui/commit/10ac8a2))
- **kit:** rename `value` to `listbox` in `XListboxAccessor` interface ([5752077](https://github.com/CORETEQ/mixin-ui/commit/5752077))
- **kit:** rename `controlChanges` to `valueChanges` in `XControlAccessor` ([c7eef5a](https://github.com/CORETEQ/mixin-ui/commit/c7eef5a))
- **kit:** add `keyboardEvents` property to `XListboxAccessor` ([169f8c8](https://github.com/CORETEQ/mixin-ui/commit/169f8c8))
- **kit:** rename `compareFn` to `comparator` in `XSelectOptions` ([9ce790b](https://github.com/CORETEQ/mixin-ui/commit/9ce790b))
- **web:** add `pipes` documentation ([4ee788a](https://github.com/CORETEQ/mixin-ui/commit/4ee788a))

### 🩹 Fixes

- **kit:** improve keyboard interaction in `XCombobox` ([171047e](https://github.com/CORETEQ/mixin-ui/commit/171047e))

### 🔥 Performance

- improve `state` stream performance ([6b9c0ac](https://github.com/CORETEQ/mixin-ui/commit/6b9c0ac))

## 0.0.1-alpha.15 (2025-07-21)

### 🚀 Features

- **kit:** add `matcher` property to `XComboboxOptions`, rename `compareFn` / `stringifyFn` ([4e00de8](https://github.com/CORETEQ/mixin-ui/commit/4e00de8))
- **kit:** expose new inputs for `XCombobox` based on new options interface ([9d89867](https://github.com/CORETEQ/mixin-ui/commit/9d89867))
- **kit:** implement aria properties binding in `XCombobox` ([80a02b6](https://github.com/CORETEQ/mixin-ui/commit/80a02b6))

## 0.0.1-alpha.14 (2025-07-21)

### 🚀 Features

- **kit:** remove `handleControlInit`, `handleControlDestroy` methods in `XControlAccessor` ([a9b8ea3](https://github.com/CORETEQ/mixin-ui/commit/a9b8ea3))
- **kit:** implement `inputMode` binding to a native input based on `decimalScale` in `XInputNumber` ([e3b890c](https://github.com/CORETEQ/mixin-ui/commit/e3b890c))

## 0.0.1-alpha.13 (2025-07-21)

### 🚀 Features

- **cdk:** rename `maskedValue` to `rawValue` in `XMask` interface, update tsdoc ([0c49480](https://github.com/CORETEQ/mixin-ui/commit/0c49480))
- **cdk:** update `rawValue` getter in `IMaskImpl` ([79f8aaf](https://github.com/CORETEQ/mixin-ui/commit/79f8aaf))
- **kit:** improve `handleCalendarValue` typing in `XCalendarAccessor` ([c08d92c](https://github.com/CORETEQ/mixin-ui/commit/c08d92c))
- **kit:** add `min` / `max` props to `XCalendarOptions` interface, expose their respective inputs ([350ebe6](https://github.com/CORETEQ/mixin-ui/commit/350ebe6))

### 🩹 Fixes

- **cdk:** patch `updateOptions` function to fix imask internal problem with options updating ([10c6c53](https://github.com/CORETEQ/mixin-ui/commit/10c6c53))
- **kit:** fix unnecessary model changes when value reset if strict is enabled in `XInputMask` ([83bd34e](https://github.com/CORETEQ/mixin-ui/commit/83bd34e))

## 0.0.1-alpha.12 (2025-07-20)

### 🚀 Features

- **cdk:** make pattern nullable in `XPatternMaskOptions` to support disabling masking ([d701d0e](https://github.com/CORETEQ/mixin-ui/commit/d701d0e))
- **cdk:** update default token ranges for date mask adapter ([65c6250](https://github.com/CORETEQ/mixin-ui/commit/65c6250))
- **kit:** remove deprecated `mapper` input in `XCalendar` ([ee17716](https://github.com/CORETEQ/mixin-ui/commit/ee17716))
- **kit:** improve visible month calculation and add popover focus handling in `XCalendar` ([5de8b86](https://github.com/CORETEQ/mixin-ui/commit/5de8b86))
- **kit:** remove deprecated `mapper` property from `XCalendarOptions` interface ([6b4d6ae](https://github.com/CORETEQ/mixin-ui/commit/6b4d6ae))
- **kit:** rename `value` property to `calendar` in `XCalendarAccessor` interface ([264e3bf](https://github.com/CORETEQ/mixin-ui/commit/264e3bf))
- **kit:** add additional check before model update propagation in `XControl` ([b7dc25f](https://github.com/CORETEQ/mixin-ui/commit/b7dc25f))

### 🩹 Fixes

- **cdk:** preserve error cause for better debugging in `IMaskImpl` ([bd5313b](https://github.com/CORETEQ/mixin-ui/commit/bd5313b))
- **cdk:** update pattern mask adapter to allow switching between pattern-based and nullable mask ([43b200a](https://github.com/CORETEQ/mixin-ui/commit/43b200a))
- **kit:** prevent value update on close when the native value is empty in `XCombobox` ([7026d6e](https://github.com/CORETEQ/mixin-ui/commit/7026d6e))
- **kit:** resolve propagation of value changes in cases when a month/year is selected in `XCalendar` ([3185a67](https://github.com/CORETEQ/mixin-ui/commit/3185a67))
- **kit:** resolve correct model value reset on focusout with incompleted mask `XInputDate` ([bb8f1f0](https://github.com/CORETEQ/mixin-ui/commit/bb8f1f0))

## 0.0.1-alpha.11 (2025-07-18)

### 🚀 Features

- **kit:** refactor `month` input to model in `XCalendar` ([8a09ce3](https://github.com/CORETEQ/mixin-ui/commit/8a09ce3))
- **kit:** rename `gray` color scale to `neutral`, update `XColor` union type ([b9b4aae](https://github.com/CORETEQ/mixin-ui/commit/b9b4aae))

### 🩹 Fixes

- **kit:** implement disabled state for `XInputDate` ([e3768ab](https://github.com/CORETEQ/mixin-ui/commit/e3768ab))

## 0.0.1-alpha.10 (2025-07-17)

### 🚀 Features

- **kit:** rename `handleDate` method to `handleCalendarValue` in `XCalendarAccessor` interface ([687baf3](https://github.com/CORETEQ/mixin-ui/commit/687baf3))
- **kit:** add `month` input to `XCalendar` ([3145e94](https://github.com/CORETEQ/mixin-ui/commit/3145e94))

### 🩹 Fixes

- **kit:** update `XComparator` generic default type to `any` ([230446a](https://github.com/CORETEQ/mixin-ui/commit/230446a))

## 0.0.1-alpha.9 (2025-07-16)

### 🚀 Features

- **cdk:** add `isMatchingTarget` function to dom utils ([d8fbc16](https://github.com/CORETEQ/mixin-ui/commit/d8fbc16))
- **kit:** rename `resetUncompleted` to `strict` in `XInputMask` ([5af0969](https://github.com/CORETEQ/mixin-ui/commit/5af0969))
- **kit:** remove self-popover arrow from `XOption` ([4bd409b](https://github.com/CORETEQ/mixin-ui/commit/4bd409b))
- **kit:** update `XListboxAccessor` interface, rename from `handleOptions` to `handleListboxValue` ([b6474a3](https://github.com/CORETEQ/mixin-ui/commit/b6474a3))
- **kit:** make `value` input of `XOption` required, add generic for value type ([373e2c2](https://github.com/CORETEQ/mixin-ui/commit/373e2c2))
- **kit:** add `strict` property for `XComboboxOptions` ([e6ccf92](https://github.com/CORETEQ/mixin-ui/commit/e6ccf92))
- **kit:** make accessor injection in `XListbox` optional, refactor based on new accessor interface ([c7514d1](https://github.com/CORETEQ/mixin-ui/commit/c7514d1))
- **kit:** add `stringifyFn` to `XComboboxOptions` ([b6887a1](https://github.com/CORETEQ/mixin-ui/commit/b6887a1))
- **kit:** implement `XCombobox` ([d7fb4ab](https://github.com/CORETEQ/mixin-ui/commit/d7fb4ab))

### 🩹 Fixes

- **kit:** ensure `markAsTouched` is called on popover close in `XInputDate` ([4cc9094](https://github.com/CORETEQ/mixin-ui/commit/4cc9094))
- **kit:** fix `provideComboboxOptions` return type and value ([37fa881](https://github.com/CORETEQ/mixin-ui/commit/37fa881))

## 0.0.1-alpha.8 (2025-07-15)

### 🚀 Features

- **kit:** implement `resetUncompleted` option for `XInputMask` ([35a75cd](https://github.com/CORETEQ/mixin-ui/commit/35a75cd))
- **kit:** update `x-input` invalid styles ([01680b8](https://github.com/CORETEQ/mixin-ui/commit/01680b8))
- **kit:** set default value of `resetUncompleted` to true in `XInputMaskOptions` ([d38f1b7](https://github.com/CORETEQ/mixin-ui/commit/d38f1b7))

### 🩹 Fixes

- **cdk:** update default `pattern` value in default options of `XPatternMaskOptions` ([45314f0](https://github.com/CORETEQ/mixin-ui/commit/45314f0))
- **cdk:** implement `shouldPropagateChanges` getter to avoid unnecessary emissions ([acc6de4](https://github.com/CORETEQ/mixin-ui/commit/acc6de4))
- **kit:** add `innerValueChanges` subject to `XInputMask` for the correct model's value reset ([c6bcb69](https://github.com/CORETEQ/mixin-ui/commit/c6bcb69))

## 0.0.1-alpha.7 (2025-07-15)

### 🚀 Features

- **cdk:** implement new mask type `pattern` with a built-in interface ([4c55460](https://github.com/CORETEQ/mixin-ui/commit/4c55460))
- **kit:** rename `x-text` selector to `x-input-text` ([9d4d9aa](https://github.com/CORETEQ/mixin-ui/commit/9d4d9aa))
- **kit:** add `XInputMaskOptions` interface and provider, expose `XInputMask` inputs ([ac63073](https://github.com/CORETEQ/mixin-ui/commit/ac63073))

## 0.0.1-alpha.6 (2025-07-15)

### 🚀 Features

- **kit:** update `XDateRoot` template ([b412d29](https://github.com/CORETEQ/mixin-ui/commit/b412d29))
- **kit:** implement `invalid` and disabled states for `XCheckbox` and `XSwitch` ([ce57de8](https://github.com/CORETEQ/mixin-ui/commit/ce57de8))
- **kit:** remove grouped imports defined as a constant for composite components ([fbec31f](https://github.com/CORETEQ/mixin-ui/commit/fbec31f))
- **kit:** rename `XPopover` to `XPopoverTarget`, `XPopoverContent` to `XPopover` ([c124760](https://github.com/CORETEQ/mixin-ui/commit/c124760))
- **kit:** implement `XTextarea` styles ([403a373](https://github.com/CORETEQ/mixin-ui/commit/403a373))

## 0.0.1-alpha.5 (2025-07-14)

### 🚀 Features

- **kit:** implement `disabled` input for calendar, deprecate `mapper` ([c62bd93](https://github.com/CORETEQ/mixin-ui/commit/c62bd93))
- **kit:** add 2 methods `handleArrowUp`, `handleArrowDown` to `XNumberRoot` ([a3a6440](https://github.com/CORETEQ/mixin-ui/commit/a3a6440))

## 0.0.1-alpha.4 (2025-07-14)

### 🚀 Features

- **kit:** add `popoverFixed` input to `x-input-date`, remove `popoverOpen` model ([2e7152d](https://github.com/CORETEQ/mixin-ui/commit/2e7152d))
- **kit:** implement `autoFocus` input for popover ([648fbda](https://github.com/CORETEQ/mixin-ui/commit/648fbda))

## 0.0.1-alpha.3 (2025-07-14)

### 🚀 Features

- **kit:** improve calendar mode handling ([ef75786](https://github.com/CORETEQ/mixin-ui/commit/ef75786))
- **kit:** update the color system by adding 5 semantic scales: gray, main, success, warn, and error ([0b4af9d](https://github.com/CORETEQ/mixin-ui/commit/0b4af9d))

### 🩹 Fixes

- **kit:** update `.x-input` native control display, inline-size styles ([b7a8b7c](https://github.com/CORETEQ/mixin-ui/commit/b7a8b7c))

## 0.0.1-alpha.2 (2025-07-13)

### 🚀 Features

- **cdk:** add injection context assertion to `fromAfterNextRender` ([a0c5436](https://github.com/CORETEQ/mixin-ui/commit/a0c5436))
- **kit:** change `XCalendarMapper` return type to `any` ([9a7b952](https://github.com/CORETEQ/mixin-ui/commit/9a7b952))
