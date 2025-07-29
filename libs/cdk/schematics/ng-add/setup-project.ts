import { chain, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { getProjectFromWorkspace, getProjectStyleFile } from '@angular/cdk/schematics';
import { readWorkspace, updateWorkspace } from '@schematics/angular/utility';
import { ProjectType } from '@schematics/angular/utility/workspace-models';
import { Schema } from './schema';

export default function (options: Schema): Rule {
  return async (host: Tree, context: SchematicContext) => {
    const workspace = (await readWorkspace(host)) as any;
    const project = getProjectFromWorkspace(workspace, options.project);

    if (project.extensions['projectType'] === ProjectType.Application) {
      return chain([addGlobalStylesToWorkspace(options), addAppStyles(options)]);
    }

    context.logger.warn(
      'Mixin UI has been set up in your workspace. There is no additional setup ' +
        'required for consuming Mixin UI in your library project.\n\n' +
        'If you intended to run the schematic on a different project, pass the `--project` ' +
        'option.'
    );
    return;
  };
}

function addGlobalStylesToWorkspace(options: Schema): Rule {
  return updateWorkspace(workspace => {
    const project = workspace.projects.get(options.project);
    if (!project) {
      throw new Error(`Project ${options.project} not found`);
    }

    const buildTarget = project.targets.get('build');
    if (!buildTarget || !buildTarget.options) {
      throw new Error(`Cannot find build options for project ${options.project}`);
    }

    const styles = (buildTarget.options.styles ?? []) as Array<string>;

    const stylePathsToAdd = [
      'node_modules/@angular/cdk/overlay-prebuilt.css',
      'node_modules/@mixin-ui/kit/styles/index.scss',
    ];

    stylePathsToAdd.forEach(path => {
      if (!styles.includes(path)) {
        styles.push(path);
      }
    });

    buildTarget.options.styles = styles;
  });
}

function addAppStyles(options: Schema) {
  return async (host: Tree, context: SchematicContext) => {
    const workspace = (await readWorkspace(host)) as any;
    const project = getProjectFromWorkspace(workspace, options.project);
    const styleFilePath = getProjectStyleFile(project);
    const logger = context.logger;

    if (!styleFilePath) {
      logger.error(`Could not find the default style file for this project.`);
      logger.info(`Consider manually adding the Inter font to your CSS.`);
      logger.info(`More information at https://fonts.google.com/specimen/Inter`);
      return;
    }

    const buffer = host.read(styleFilePath);

    if (!buffer) {
      logger.error(
        `Could not read the default style file within the project ` + `(${styleFilePath})`
      );
      logger.info(`Please consider manually setting up the Inter font.`);
      return;
    }

    const htmlContent = buffer.toString();
    const insertion =
      '\n' +
      `html, body { height: 100%; }\n` +
      `body { margin: 0; font-family: Inter, "Helvetica Neue", sans-serif; }\n`;

    if (htmlContent.includes(insertion)) {
      return;
    }

    const recorder = host.beginUpdate(styleFilePath);

    recorder.insertLeft(htmlContent.length, insertion);
    host.commitUpdate(recorder);
  };
}
