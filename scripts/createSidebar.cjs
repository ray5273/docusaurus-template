const fs = require("fs");
const path = require('path');
function getDirectories(srcPath) {
    let directories = [];
    const files = fs.readdirSync(srcPath);
    for (const file of files) {
        if (file.startsWith('.')) {
            continue;
        }
        const filePath = path.join(srcPath, file);
        if (fs.statSync(filePath).isDirectory()) {
            directories.push(filePath);
        }
    }
    return directories;
}

function generateSidebarConfig(dirPath, isRoot = true) {
    const items = [];
    const subDirs = getDirectories(dirPath);

    const mdFiles = fs.readdirSync(dirPath).filter(file => file.endsWith('.md')).map(file => `${dirPath}/${file.slice(0, -3)}`);
    if (mdFiles.length > 0) {
        // docs 부분 제거필요
        items.push(...mdFiles.map(file => file.replace(/\\/g, '/').replace('./', '').replace('docs/', '')));
    }

    for (const subDir of subDirs) {
        const subCategory = generateSidebarConfig(subDir,false);
        if (subCategory) {
            items.push(subCategory);
        }
    }

    if (items.length === 0) {
        return null;
    }
    if (isRoot) {
        return items;
    }

    return {
        type: 'category',
        label: path.basename(dirPath),
        items: items,
    };
}

const sidebarConfig = generateSidebarConfig('./docs');
// Check if version option is provided
if (process.argv.includes('--version')) {
    const output = {
        tutorialSidebar: sidebarConfig
    };
    console.log("generated sidebar_version.json");

    fs.writeFileSync('./sidebar_version.json', JSON.stringify(output, null, 2));
} else {
    console.log("generated sidebar.json");
    fs.writeFileSync('./sidebar.json', JSON.stringify(sidebarConfig, null, 2));
}