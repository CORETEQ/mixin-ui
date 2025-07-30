import { releaseChangelog, releaseVersion } from 'nx/release';
import * as yargs from 'yargs';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';

(async () => {
  const options = await yargs
    .version(false)
    .option('version', {
      description: 'Explicit version specifier to use, if overriding conventional commits',
      type: 'string',
    })
    .option('dryRun', {
      alias: 'd',
      description: 'Whether or not to perform a dry-run of the release process, defaults to true',
      type: 'boolean',
      default: true,
    })
    .option('verbose', {
      description: 'Whether or not to enable verbose logging, defaults to false',
      type: 'boolean',
      default: true,
    })
    .parseAsync();

  const { workspaceVersion, projectsVersionData } = await releaseVersion({
    specifier: options.version,
    dryRun: options.dryRun,
    verbose: options.verbose,
    gitCommit: false,
    gitTag: false,
  });

  const { newVersion } = projectsVersionData.kit;

  if (!options.dryRun) {
    const releaseBranch = `release/${newVersion}`;

    try {
      const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();

      if (currentBranch !== 'main') {
        execSync('git checkout main', { stdio: 'inherit' });
        execSync('git pull origin main', { stdio: 'inherit' });
      }

      execSync(`git checkout -b ${releaseBranch}`, { stdio: 'inherit' });

      const versionFilePath = path.join(__dirname, '../libs/web/src/app/core/version.ts');
      const content = `// This file is generated automatically. Do not edit manually!
export const MIXIN_UI_VERSION = '${newVersion}';
`;
      fs.writeFileSync(versionFilePath, content);
      execSync(`git add ${versionFilePath}`, { stdio: 'inherit' });

      const result = await releaseChangelog({
        versionData: projectsVersionData,
        version: workspaceVersion,
        dryRun: options.dryRun,
        verbose: options.verbose,
        gitCommit: false,
        gitTag: false,
      });

      execSync('git add .', { stdio: 'inherit' });
      execSync(`git commit -m "chore(release): ${newVersion}"`, { stdio: 'inherit' });
      execSync(`git push origin ${releaseBranch}`, { stdio: 'inherit' });
      process.exit(Object.values(result).every(result => result.code === 0) ? 0 : 1);
    } catch (error) {
      console.error('❌ Error during release process:', error);
      process.exit(1);
    }
  } else {
    const result = await releaseChangelog({
      versionData: projectsVersionData,
      version: workspaceVersion,
      dryRun: options.dryRun,
      verbose: options.verbose,
      gitCommit: false,
      gitTag: false,
    });

    console.log(`🔍 DRY RUN: Would create release branch: release/${newVersion}`);
    process.exit(Object.values(result).every(result => result.code === 0) ? 0 : 1);
  }
})();
