const fs = require('fs');
const path = require('path');

const kitPkgPath = path.join(__dirname, '../libs/kit/package.json');
const kitPkg = JSON.parse(fs.readFileSync(kitPkgPath, 'utf8'));

const versionFilePath = path.join(__dirname, '../libs/version.ts');

const content = `// This file is generated automatically. Do not edit manually!
export const MIXIN_UI_VERSION = '${kitPkg.version}';
`;

fs.writeFileSync(versionFilePath, content);
console.log(`libs/version.ts updated: ${kitPkg.version}`);
