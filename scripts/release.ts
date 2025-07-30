import { releaseChangelog, releaseVersion } from 'nx/release';
import * as yargs from 'yargs';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';

function extractReleaseNotes(changelogPath: string, version: string): string {
  try {
    if (!fs.existsSync(changelogPath)) {
      return `Release v${version}`;
    }

    const changelogContent = fs.readFileSync(changelogPath, 'utf8');

    const versionRegex = new RegExp(
      `## \\[?${version.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\]?.*?\\n([\\s\\S]*?)(?=\\n## |$)`,
      'i'
    );
    const match = changelogContent.match(versionRegex);

    if (match && match[1]) {
      const releaseNotes = match[1]
        .trim()
        .replace(/\n{3,}/g, '\n\n')
        .replace(/^\s*\n/gm, '')
        .substring(0, 1000);

      return releaseNotes || `Release v${version}`;
    }

    return `Release v${version}`;
  } catch (error) {
    console.warn('⚠️ Could not extract release notes from changelog:', error);
    return `Release v${version}`;
  }
}

function createGitHubRelease(version: string, releaseNotes: string): void {
  try {
    console.log(`Creating GitHub release for v${version}`);

    const releaseBody = releaseNotes.replace(/"/g, '\\"');

    execSync(
      `gh release create v${version} --title "Release v${version}" --notes "${releaseBody}"`,
      {
        stdio: 'inherit',
      }
    );

    console.log(`✅ GitHub release v${version} created successfully!`);
  } catch (error) {
    console.warn(
      '⚠️ Could not create GitHub release (gh CLI might not be installed or authenticated):',
      error
    );
    console.log(
      '💡 You can create the release manually at: https://github.com/your-repo/releases/new'
    );
  }
}

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
    gitPush: false,
  });

  const { newVersion } = projectsVersionData.kit;

  if (!options.dryRun) {
    const releaseBranch = `release/${newVersion}`;

    try {
      const currentBranch = execSync('git branch --show-current', { encoding: 'utf8' }).trim();

      if (currentBranch !== 'main') {
        console.log('Switching to main branch...');
        execSync('git checkout main', { stdio: 'inherit' });
        execSync('git pull origin main', { stdio: 'inherit' });
      }

      execSync(`git checkout -b ${releaseBranch}`, { stdio: 'inherit' });

      const versionFilePath = path.join(__dirname, '../libs/web/src/app/core/version.ts');
      const content = `// This file is generated automatically. Do not edit manually!
export const MIXIN_UI_VERSION = '${newVersion}';
`;
      fs.writeFileSync(versionFilePath, content);

      const result = await releaseChangelog({
        versionData: projectsVersionData,
        version: workspaceVersion,
        dryRun: options.dryRun,
        verbose: options.verbose,
        gitCommit: false,
        gitTag: false,
        gitPush: false,
      });

      execSync('git add .', { stdio: 'inherit' });
      execSync(`git commit -m "chore(release): ${newVersion}"`, { stdio: 'inherit' });

      // Извлекаем release notes из сгенерированного changelog
      const changelogPath = path.join(__dirname, '../CHANGELOG.md');
      const releaseNotes = extractReleaseNotes(changelogPath, newVersion!);

      console.log(`Creating tag: v${newVersion} with release notes`);

      // Создаем тег с release notes
      // Используем временный файл для сообщения тега, чтобы избежать проблем с кавычками
      const tagMessageFile = path.join(__dirname, '../temp-tag-message.txt');
      const tagMessage = `Release v${newVersion}\n\n${releaseNotes}`;
      fs.writeFileSync(tagMessageFile, tagMessage);

      try {
        execSync(`git tag -a v${newVersion} -F "${tagMessageFile}"`, { stdio: 'inherit' });
      } finally {
        // Удаляем временный файл
        if (fs.existsSync(tagMessageFile)) {
          fs.unlinkSync(tagMessageFile);
        }
      }

      execSync(`git push origin ${releaseBranch}`, { stdio: 'inherit' });
      execSync(`git push origin v${newVersion}`, { stdio: 'inherit' });

      createGitHubRelease(newVersion!, releaseNotes);

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
      gitPush: false,
    });

    console.log(`🔍 DRY RUN: Would create release branch: release/${newVersion}`);

    process.exit(Object.values(result).every(result => result.code === 0) ? 0 : 1);
  }
})();
