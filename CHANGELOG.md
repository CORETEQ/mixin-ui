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