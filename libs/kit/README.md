# @mixin-ui/kit

A collection of reusable UI components for Angular, built on top of [@mixin-ui/cdk](https://github.com/CORETEQ/mixin-ui/tree/main/libs/cdk/). The kit aims to provide flexible building blocks for developing Angular applications.

> ⚠️ **Alpha Notice**
>
> Mixin UI is currently in **alpha stage**. Expect breaking changes as we iterate and improve the API.
> Use with caution in production environments.

## How to install
This package builds on top of [`@angular/cdk`](https://www.npmjs.com/package/@angular/cdk) and [`@mixin-ui/cdk`](https://www.npmjs.com/package/@mixin-ui/cdk). Make sure to install both:

```
npm install @angular/cdk @mixin-ui/cdk @mixin-ui/kit
```

### Add styles

Make sure to include the following stylesheet in your angular.json (for Angular CLI projects) or your global styles:

```
@import '@angular/cdk/overlay-prebuilt.css';
@import '@mixin-ui/kit/styles/index.scss';
```

## Documentation

📚 [View docs on website →](https://mixin-ui.dev/)
