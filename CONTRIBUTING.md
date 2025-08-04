# Contributing

> Thank you for considering contributing to Mixin UI! Your help is very much appreciated!

When contributing, it's better to first discuss the change you wish to make via issue or discussion with the owners of this repository before making a change.

## Getting Started

In order to make your contribution please make a fork of the repository. After you've pulled the code, follow these steps to kick-start the development:

1. Run `pnpm install --frozen-lockfile` to install dependencies
2. Run `pnpm start` to launch demo app

## Pull Request Process

1. We follow [Conventional Commits](https://www.conventionalcommits.org/) in our commit messages with the following scopes:
  - `cdk`: changes to the cdk package
  - `kit`: changes to the kit package
  - `cli`: changes to the cli package
  - `web`: changes to the demo app

   Example: `feat(kit): add new button component`

2. Follow our [Coding Standards](./CODING_STANDARDS.md) guidelines
3. Make sure to include appropriate issue templates when reporting bugs or requesting features
4. When you are ready, create Pull Request of your fork into original repository

## Issue Templates

When filing issues, please use the appropriate templates:

- **Bug Report**: for reporting bugs or unexpected behavior
- **Feature Request**: for proposing new features or enhancements

## Architecture

This project is organized as an Nx monorepo with the following packages:

- **cdk**: core development kit with foundational utilities
- **kit**: component library built on top of CDK
- **cli**: command line tools with Angular Schematics for project setup
- **web**: demo app (landing, examples)

## Testing

Testing infrastructure is currently in development. Stay tuned for testing guidelines and commands.

---

We welcome all contributions, no matter how big or small! 🚀
