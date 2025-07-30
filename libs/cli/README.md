# @mixin-ui/cli

Command line tools for [Mixin UI](https://github.com/CORETEQ/mixin-ui/) that provide Angular Schematics for easy project setup and configuration. This package automates the installation and configuration of Mixin UI libraries in Angular projects.

> ⚠️ **Alpha Notice**
>
> Mixin UI is currently in **alpha stage**. Expect breaking changes as we iterate and improve the API.
> Use with caution in production environments.

## What it does

The CLI package provides the following schematics:

### ng-add
Automatically sets up Mixin UI in your Angular project by:

- Installing required dependencies:
  - `@angular/cdk`
  - `@mixin-ui/cdk`
  - `@mixin-ui/kit`
- Adding necessary global styles to your `angular.json`:
  - `@angular/cdk/overlay-prebuilt.css`
  - `@mixin-ui/kit/styles/index.scss`

### Usage

```bash
# Add Mixin UI to your project
ng add @mixin-ui/cli

# Specify a specific project (for monorepos)
ng add @mixin-ui/cli --project=my-app
```

## Documentation

📚 [View docs on website →](https://mixin-ui.dev/)
