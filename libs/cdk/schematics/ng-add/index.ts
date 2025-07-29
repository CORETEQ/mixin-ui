import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask, RunSchematicTask } from '@angular-devkit/schematics/tasks';
import {
  addPackageJsonDependency,
  getPackageJsonDependency,
  NodeDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { Schema } from './schema';

const CDK_PEER_VERSION = '>=19.2.0';
const MIXIN_UI_CDK = '@mixin-ui/cdk';
const MIXIN_UI_KIT = '@mixin-ui/kit';
const ANGULAR_CDK = '@angular/cdk';

function addDependencies(tree: Tree, context: SchematicContext): void {
  const cdkDependency = getPackageJsonDependency(tree, ANGULAR_CDK);

  if (!cdkDependency) {
    const dependency: NodeDependency = {
      type: NodeDependencyType.Default,
      name: ANGULAR_CDK,
      version: CDK_PEER_VERSION,
      overwrite: false,
    };
    addPackageJsonDependency(tree, dependency);
  }

  const mixinUiCdkDependency = getPackageJsonDependency(tree, MIXIN_UI_CDK);

  if (!mixinUiCdkDependency) {
    const dependency: NodeDependency = {
      type: NodeDependencyType.Default,
      name: MIXIN_UI_CDK,
      version: 'latest',
      overwrite: false,
    };
    addPackageJsonDependency(tree, dependency);
  }

  const mixinUiKitDependency = getPackageJsonDependency(tree, MIXIN_UI_KIT);

  if (!mixinUiKitDependency) {
    const dependency: NodeDependency = {
      type: NodeDependencyType.Default,
      name: MIXIN_UI_KIT,
      version: 'latest',
      overwrite: false,
    };
    addPackageJsonDependency(tree, dependency);
  }

  context.addTask(new NodePackageInstallTask());
}

export default function (options: Schema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    addDependencies(tree, context);
    const installTaskId = context.addTask(new NodePackageInstallTask());
    context.addTask(new RunSchematicTask('ng-add-setup-project', options), [installTaskId]);
  };
}
