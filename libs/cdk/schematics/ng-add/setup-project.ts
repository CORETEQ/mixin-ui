import { chain, Rule } from '@angular-devkit/schematics';
import {
  ProjectDefinition,
  updateWorkspace,
  WorkspaceDefinition,
} from '@schematics/angular/utility';
import { Schema } from './schema';

const NG_CDK_STYLES_PATH = '@angular/cdk/overlay-prebuilt.css';
const MIXIN_STYLES_PATH = '@mixin-ui/kit/styles/index.scss';

export default function (options: Schema): Rule {
  return chain([addGlobalStylesToWorkspace(options)]);
}

function addGlobalStylesToWorkspace(options: Schema): Rule {
  return updateWorkspace(workspace => {
    const projects = getProjectsToProcess(workspace, options);

    if (projects.length === 0) {
      throw new Error('No application projects found to process');
    }

    projects.forEach(project => {
      const buildTarget = project.targets.get('build');

      if (!buildTarget || !buildTarget.options) {
        throw new Error(`Cannot find build options for project ${project}`);
      }

      const styles = (buildTarget.options.styles ?? []) as Array<string>;

      [NG_CDK_STYLES_PATH, MIXIN_STYLES_PATH].forEach(path => {
        if (!styles.includes(path)) {
          styles.push(path);
        }
      });

      buildTarget.options.styles = styles;
    });
  });
}

function getProjectsToProcess(
  workspace: WorkspaceDefinition,
  options: Schema
): ProjectDefinition[] {
  const { projects, extensions } = workspace;

  const project = projects.get(options.project || String(extensions.defaultProject));

  if (project) {
    return [project];
  }

  return Array.from(projects.entries()).reduce<ProjectDefinition[]>((acc, [_, project]) => {
    if (project.extensions.projectType === 'application') {
      acc.push(project);
    }
    return acc;
  }, []);
}
