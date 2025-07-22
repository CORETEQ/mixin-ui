# Contributing

> Thank you for considering contributing to Mixin UI! Your help is very much appreciated!

When contributing, it's better to first discuss the change you wish to make via issue or discussion with the owners of this repository before making a change.

## Getting Started

In order to make your contribution please make a fork of the repository. After you've pulled the code, follow these steps to kick-start the development:

1. Run `pnpm install --frozen-lockfile` to install dependencies
2. Run `pnpm start` to launch demo project

## Pull Request Process

1. We follow [Conventional Commits](https://www.conventionalcommits.org/) in our commit messages with the following scopes:
  - `cdk`: Changes to the CDK package
  - `kit`: Changes to the Kit package
  - `web`: Changes to the Demo project

   Example: `feat(kit): add new button component`

2. Follow our [Coding Standards](./CODING_STANDARDS.md) guidelines
3. Make sure to include appropriate issue templates when reporting bugs or requesting features
4. When you are ready, create Pull Request of your fork into original repository

## Issue Templates

When filing issues, please use the appropriate templates:

- **Bug Report**: For reporting bugs or unexpected behavior
- **Feature Request**: For proposing new features or enhancements

## Architecture

This project is organized as an Nx monorepo with the following packages:

- **Cdk**: Core development kit with foundational utilities
- **Kit**: Component library built on top of CDK
- **Web**: Web-specific implementations and examples

## Testing

Testing infrastructure is currently in development. Stay tuned for testing guidelines and commands.

---

We welcome all contributions, no matter how big or small! 🚀
