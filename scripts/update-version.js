const fs = require('fs');
const path = require('path');

const kitPkgPath = path.join(__dirname, '../libs/kit/package.json');
const kitPkg = JSON.parse(fs.readFileSync(kitPkgPath, 'utf8'));
const versionFilePath = path.join(__dirname, '../libs/web/src/app/core/version.ts');

const content = `// This file is generated automatically. Do not edit manually!
export const MIXIN_UI_VERSION = '${kitPkg.version}';
`;

fs.writeFileSync(versionFilePath, content);
console.log(`Mixin UI version updated: ${kitPkg.version}`);
