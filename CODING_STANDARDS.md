# Mixin UI Coding Standards

## CSS

#### Prefer CSS classes to tag names for styling

We avoid targeting tag names in favor of CSS classes to prepare for Angular's planned [selectorless components](https://angular.dev/roadmap#developer-velocity) feature. Use CSS class names prefixed with `.x-` instead of tag names:

```scss
/** Do: */
.x-calendar {
  ...
}

/** Don't: */
x-calendar {
  ...
}

/** Do: */
.x-btn {
  ...
}

/** Don't: */
button[x-btn] {
  ...
}
```

#### View Encapsulation

We intentionally avoid using Angular's default style [encapsulation](https://angular.dev/api/core/ViewEncapsulation) (Emulated) in favor of global styles. This allows easier theming and style overrides by consumers of the library. If needed, consumers can scope styles themselves using class-based selectors like .my-app .x-btn.

#### Specificity

To ensure that consumers can easily override styles, we avoid high-specificity selectors. This is especially important for modifier classes (e.g. `.x-size-lg`, `.x-variant-ghost`, etc.). We recommend using [`:where()`](https://developer.mozilla.org/en-US/docs/Web/CSS/:where/) for modifiers and state styles. The `:where()` selector has zero specificity, which helps keep the styles flexible and easy to override:

```scss
/** Do: */
&:where(.x-variant-ghost) {
  background: transparent;
}

/** Don't: */
&[class~='x-variant-ghost'] {
  background: transparent;
}

/** Do: */
&:where(:hover) {
  background-color: var(--x-hover);
}

/** Don't: */
&:hover {
  background-color: var(--x-hover);
}
```

Using low-specificity selectors:

- reduces the need for `!important` in userland code
- allows easier theming and customization

🔗 [CSS Specificity Calculator](https://specificity.keegan.st/)
