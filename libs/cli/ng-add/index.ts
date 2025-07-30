import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import {
  addPackageJsonDependency,
  getPackageJsonDependency,
  NodeDependencyType,
  removePackageJsonDependency,
} from '@schematics/angular/utility/dependencies';
import { Schema } from './schema';

const CORE = '@angular/core';
const CDK = '@angular/cdk';
const MIXIN_CDK = '@mixin-ui/cdk';
const MIXIN_KIT = '@mixin-ui/kit';
const MIXIN_CLI = '@mixin-ui/cli';

function addDependencies(tree: Tree): void {
  addAngularCdk(tree);
  addMixinCdk(tree);
  addMixinKit(tree);
}

function addAngularCdk(tree: Tree): void {
  const coreVersion = getPackageJsonDependency(tree, CORE)?.version;

  if (!coreVersion) {
    return;
  }

  const [majorVersion] = coreVersion.match(/\d+/) || [];

  if (majorVersion !== null) {
    addPackageJsonDependency(tree, {
      name: CDK,
      version: `^${majorVersion}.0.0`,
      type: NodeDependencyType.Default,
    });
  }
}

function addMixinCdk(tree: Tree): void {
  const existing = getPackageJsonDependency(tree, MIXIN_CDK);

  if (existing) {
    return;
  }

  addPackageJsonDependency(tree, {
    type: NodeDependencyType.Default,
    name: MIXIN_CDK,
    version: 'latest',
  });
}

function addMixinKit(tree: Tree): void {
  const existing = getPackageJsonDependency(tree, MIXIN_KIT);

  if (existing) {
    return;
  }

  addPackageJsonDependency(tree, {
    type: NodeDependencyType.Default,
    name: MIXIN_KIT,
    version: 'latest',
  });
}

export default function (options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    addDependencies(tree);
    const installTaskId = context.addTask(new NodePackageInstallTask());
    context.addTask(new RunSchematicTask('ng-add-setup-project', options), [installTaskId]);

    try {
      if (getPackageJsonDependency(tree, MIXIN_CLI)?.version) {
        removePackageJsonDependency(tree, MIXIN_CLI);
      }
    } catch {
      /* empty */
    }
  };
}
