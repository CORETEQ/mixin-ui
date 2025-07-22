# Mixin UI Coding Standards

## CSS

#### Prefer CSS classes to tag names for styling
We avoid targeting tag names in favor of CSS classes to prepare for Angular's planned [selectorless components](https://angular.dev/roadmap#developer-velocity) feature. Use CSS class names defined by us instead of tag names.

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
