import { chain, Rule } from '@angular-devkit/schematics';
import { updateWorkspace } from '@schematics/angular/utility';
import { Schema } from './schema';

const NG_CDK_STYLES_PATH = 'node_modules/@angular/cdk/overlay-prebuilt.css';
const MIXIN_STYLES_PATH = 'node_modules/@mixin-ui/kit/styles/index.scss';

export default function (options: Schema): Rule {
  return chain([addGlobalStylesToWorkspace(options)]);
}

function addGlobalStylesToWorkspace(options: Schema): Rule {
  return updateWorkspace(workspace => {
    const projectsToProcess = getProjectsToProcess(workspace, options);

    if (projectsToProcess.length === 0) {
      throw new Error('No application projects found to process');
    }

    projectsToProcess.forEach(projectName => {
      const project = workspace.projects.get(projectName);

      if (!project) {
        throw new Error(`Project ${projectName} not found`);
      }

      const buildTarget = project.targets.get('build');

      if (!buildTarget || !buildTarget.options) {
        throw new Error(`Cannot find build options for project ${projectName}`);
      }

      const styles = (buildTarget.options.styles ?? []) as Array<string>;

      const stylePathsToAdd = [NG_CDK_STYLES_PATH, MIXIN_STYLES_PATH];

      stylePathsToAdd.forEach(path => {
        if (!styles.includes(path)) {
          styles.push(path);
        }
      });

      buildTarget.options.styles = styles;
    });
  });
}

function getProjectsToProcess(workspace: any, options: Schema): string[] {
  if (options.project) {
    return [options.project];
  }

  if (workspace.extensions?.defaultProject) {
    return [workspace.extensions.defaultProject];
  }

  const applicationProjects: string[] = [];

  workspace.projects.forEach((project: any, projectName: string) => {
    if (project.projectType === 'application') {
      applicationProjects.push(projectName);
    }
  });

  return applicationProjects;
}
