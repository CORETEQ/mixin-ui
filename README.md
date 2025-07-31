<div align="center">
  <a href="https://mixin-ui.dev" target="_blank" rel="noopener noreferrer">
    <img width="120" src="./mixin.svg" alt="Mixin logo">
  </a>
</div>

<h1 align="center">Open source Angular tools ⚡️</h1>
<p align="center">
  <a href="https://mixin-ui.dev/">
    <img alt="NPM Downloads" src="https://img.shields.io/npm/dw/angular?color=blue""></a>
  
  <a href="https://mixin-ui.dev/">
    <img alt="NPM Bundle size" src="https://img.shields.io/bundlephobia/minzip/angular?color=green"></a>

  <a href="https://mixin-ui.dev/">
    <img alt="GitHub License" src="https://img.shields.io/github/license/angular/angular?color=orange"></a>  

  <a href="https://mixin-ui.dev/">
    <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/angular/angular?style=flat&logo=github&color=yellow"></a>

  <a href="https://discord.gg/angular">
    <img alt="Discord" src="https://img.shields.io/discord/660863154703695893.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2" /></a>
</p>

> ⚠️ **Alpha Notice**
>
> Mixin UI is currently in **alpha stage**. Expect breaking changes as we iterate and improve the API.
> Use with caution in production environments.

## Environment

The Mixin UI libraries require the following minimum versions for proper installation and usage:

#### 🧩 Framework Compatibility

| Tool        | Minimum Version |
|-------------|-----------------|
| **Angular** | `v19.0.0`       |

#### 💻 Development Environment

| Tool           | Minimum Version | Notes                                      |
|----------------|-----------------|--------------------------------------------|
| **Node.js**    | `v21.0.0`       | Aligns with active LTS versions used in CI |
| **npm**        | Not supported   | ❌ Please use **pnpm** instead (see below)  |
| **pnpm**       | `v9.12.0`       | ✅ Preferred package manager                |

## Installation
### Automatic
```bash
ng add @mixin-ui/cli
```

### Manual
#### 1. Install Angular CDK (if not yet installed)
Mixin UI builds on top of `@angular/cdk`. If it's not already part of your project, install it with:
```bash
npm i @angular/cdk
```

#### 2. Install Mixin UI packages
Install the core libraries:
```bash
npm i @mixin-ui/{cdk,kit}
```

#### 3. Import assets & styles
Include the following assets and styles in `angular.json`:
```diff
{
  "assets": [
+   {
+     "glob": "**/*",
+     "input": "node_modules/@mixin-ui/kit/icons",
+     "output": "assets/icons"
+   }
  ],
  "styles": [
+   "@angular/cdk/overlay-prebuilt.css",
+   "@mixin-ui/kit/styles/index.scss"
  ]
}
```

## Usage

Read the docs here: <a href="https://mixin-ui.dev/installation" rel="noopener noreferrer">https://mixin-ui.dev/installation</a>.

## Releases

For changelogs, refer to the [automatically generated changelog](/CHANGELOG.md).

## Contributing

Please follow our [contributing guidelines](/CONTRIBUTING.md).

## License

Licensed under the [Apache 2.0](/LICENSE) License, Copyright © 2025-present.
