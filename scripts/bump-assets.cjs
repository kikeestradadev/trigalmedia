const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const packagePath = path.join(root, 'package.json');
const siteDataPath = path.join(root, 'src/pug/data/site-data.pug');
const packageData = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
const currentVersion = packageData.assetVersion || '1.0.0';
const versionParts = currentVersion.split('.').map(Number);

if (
	versionParts.length !== 3 ||
	versionParts.some((part) => !Number.isInteger(part) || part < 0)
) {
	throw new Error(`assetVersion inválida: ${currentVersion}`);
}

versionParts[2] += 1;
const nextVersion = versionParts.join('.');
packageData.assetVersion = nextVersion;

fs.writeFileSync(packagePath, `${JSON.stringify(packageData, null, '\t')}\n`);

const siteData = fs.readFileSync(siteDataPath, 'utf8');
const updatedSiteData = siteData.replace(
	/assetVersion:\s*'[^']+'/,
	`assetVersion: '${nextVersion}'`
);

if (updatedSiteData === siteData) {
	throw new Error('No se encontró assetVersion en site-data.pug');
}

fs.writeFileSync(siteDataPath, updatedSiteData);
console.log(`Assets actualizados: v${currentVersion} → v${nextVersion}`);
console.log('Prepros recompilará las páginas Pug si está abierto.');
