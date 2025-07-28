# Mixin UI Coding Standards

## CSS

#### Prefer CSS classes to tag names for styling
We avoid targeting tag names in favor of CSS classes to prepare for Angular's planned [selectorless components](https://angular.dev/roadmap#developer-velocity) feature. Use CSS class names prefixed with `x-` instead of tag names.

```scss
/** Do: */
.x-calendar { ... }

/** Don't: */
x-calendar { ... }

/** Do: */
.x-btn { ... }

/** Don't: */
button[x-btn] { ... }
```

#### View Encapsulation
We intentionally avoid using Angular's default style encapsulation (Emulated) in favor of global styles. This allows easier theming and style overrides by consumers of the library.

If needed, consumers can scope styles themselves using class-based selectors like .my-app .x-btn.
