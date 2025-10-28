import{ɵ as c,D as a,M as m,c as s,g as d,e as u,i as h,j as b}from"./index-Cf4Gmskf.js";const p=`## 0.0.1-alpha.5 (2025-10-28)

### 🚀 Features

- **cdk:** add \`XScrollThreshold\` directive ([3ed8086](https://github.com/CORETEQ/mixin-ui/commit/3ed8086))
- **cdk:** enhance \`XScrollThreshold\` directive with renamed inputs and output ([fb82a8a](https://github.com/CORETEQ/mixin-ui/commit/fb82a8a))
- **cdk:** add \`getActiveElement\`, \`containsFocus\` functions to dom utils ([bfb238b](https://github.com/CORETEQ/mixin-ui/commit/bfb238b))
- **kit:** add support for reduced motion preference in collapsible styles ([fa96c53](https://github.com/CORETEQ/mixin-ui/commit/fa96c53))
- **kit:** enhance combobox strict mode to reset value if focus is outside the component ([f9f4498](https://github.com/CORETEQ/mixin-ui/commit/f9f4498))

### 🩹 Fixes

- **kit:** remove prevention of pointerdown events in listbox when \`useActiveDescendant\` is enabled ([681f8c7](https://github.com/CORETEQ/mixin-ui/commit/681f8c7))

## 0.0.1-alpha.4 (2025-10-15)

### 🚀 Features

- **cdk:** add \`XAutofocus\` directive ([abee79b](https://github.com/CORETEQ/mixin-ui/commit/abee79b))
- **cdk:** add \`findFirstInvalidControl\` utility ([b6a999f](https://github.com/CORETEQ/mixin-ui/commit/b6a999f))
- **cdk:** add \`XInvalidSubmit\` directive for handling invalid form submissions ([3fc3cfc](https://github.com/CORETEQ/mixin-ui/commit/3fc3cfc))
- **cdk:** add configurable options for \`XInvalidSubmit\` directive ([3e50f41](https://github.com/CORETEQ/mixin-ui/commit/3e50f41))
- **kit:** add support for fixed positioning in the tooltip ([2698cdd](https://github.com/CORETEQ/mixin-ui/commit/2698cdd))
- **kit:** rename \`x-number\` to \`x-input-number\`, enhance spin button handling ([3fb32b7](https://github.com/CORETEQ/mixin-ui/commit/3fb32b7))
- **kit:** add \`stringify\` option to \`XSelectOptions\` ([613f98e](https://github.com/CORETEQ/mixin-ui/commit/613f98e))

### 🩹 Fixes

- **cdk:** include \`HH\` and \`mm\` in ranges to handle datetime masks ([4083a4a](https://github.com/CORETEQ/mixin-ui/commit/4083a4a))

## 0.0.1-alpha.3 (2025-09-09)

### 🚀 Features

- **kit:** update checkbox styles ([6bd22f6](https://github.com/CORETEQ/mixin-ui/commit/6bd22f6))

### 🩹 Fixes

- **cdk:** handle pattern normalization in \`date\` mask to prevent symbols shift back ([543ae95](https://github.com/CORETEQ/mixin-ui/commit/543ae95))
- **kit:** add \`aria-checked\` binding to switch for accessibility ([da572a2](https://github.com/CORETEQ/mixin-ui/commit/da572a2))
- **kit:** fix \`disabled\` handling in checkbox ([e85ddbc](https://github.com/CORETEQ/mixin-ui/commit/e85ddbc))
- **kit:** fix \`disabled\` handling in switch ([64bd234](https://github.com/CORETEQ/mixin-ui/commit/64bd234))

## 0.0.1-alpha.2 (2025-08-05)

### 🚀 Features

- **cdk:** add \`isTabOut\` utility ([237bfae](https://github.com/CORETEQ/mixin-ui/commit/237bfae))
- **kit:** make \`disabled\` non-optional in calendar options ([3226592](https://github.com/CORETEQ/mixin-ui/commit/3226592))

### 🩹 Fixes

- **kit:** fix \`withArrow\` binding to use function call ([10ac894](https://github.com/CORETEQ/mixin-ui/commit/10ac894))
- **kit:** fix \`disabled\` handling in calendar days grid ([7b17d1c](https://github.com/CORETEQ/mixin-ui/commit/7b17d1c))

## 0.0.1-alpha.1 (2025-08-04)

This was a version bump only, there were no code changes.`,i=class i{constructor(){this.changelog=p}};i.ɵfac=function(t){return new(t||i)},i.ɵcmp=c({type:i,selectors:[["app-changelog"]],decls:2,vars:1,consts:[[3,"data"]],template:function(t,o){t&1&&(s(0,"docs-page"),d(1,"markdown",0),u()),t&2&&(h(),b("data",o.changelog))},dependencies:[a,m],encapsulation:2,changeDetection:0});let n=i;export{n as default};
