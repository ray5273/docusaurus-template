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
        items.push(...mdFiles.map(file =>
        {
            const label = file.replace(/\\/g, '/').replace('./','').replace('docs/','');
            return {
                type: 'doc',
                id: label,
                className: 'icon document-icon',
            };
        }));
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
        className: 'icon directory-icon',
        items: items,
    };
}

const targetDir = process.argv[2] || './docs/';
const sidebarConfig = generateSidebarConfig(targetDir);
const validOptions = ['adr-architecture', 'userguide', 'srs']; // 사용자가 선택할 수 있는 옵션을 정의합니다.
const userOption = process.argv[3]; // 커맨드 라인에서 사용자의 선택을 가져옵니다.

if (!validOptions.includes(userOption)) {
    console.error(`Invalid option. Please choose one of the following: ${validOptions.join(', ')}`);
    process.exit(1);
}

// Check if version option is provided
if (process.argv.includes('--version')) {
    const output = {
        tutorialSidebar: sidebarConfig
    };
    console.log("generated sidebar_version.json");

    fs.writeFileSync('./sidebar_version.json', JSON.stringify(output, null, 2));
} else {
    const targetFileName = "sidebar" + "-" + userOption + ".json";
    console.log("generated " + targetFileName);
    fs.writeFileSync(targetFileName, JSON.stringify(sidebarConfig, null, 2));
}