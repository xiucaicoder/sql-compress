/**
 * uTools插件打包脚本
 */
const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');

// 项目根目录
const ROOT_DIR = path.resolve(__dirname, '..');
// 输出目录
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
// 临时目录
const TEMP_DIR = path.resolve(DIST_DIR, 'temp');
// UPX文件路径
const UPX_FILE = path.resolve(DIST_DIR, 'sql-compress.upx');

// 需要打包的文件
const INCLUDE_FILES = [
    'assets',
    'src',
    'index.html',
    'plugin.json',
    'README.md'
];

// 确保目录存在
fs.ensureDirSync(DIST_DIR);
fs.emptyDirSync(DIST_DIR);
fs.ensureDirSync(TEMP_DIR);

// 复制文件到临时目录
console.log('正在复制文件...');
INCLUDE_FILES.forEach(file => {
    const srcPath = path.resolve(ROOT_DIR, file);
    const destPath = path.resolve(TEMP_DIR, file);
    if (fs.existsSync(srcPath)) {
        if (fs.statSync(srcPath).isDirectory()) {
            fs.copySync(srcPath, destPath);
        } else {
            fs.copySync(srcPath, destPath);
        }
        console.log(`已复制: ${file}`);
    } else {
        console.warn(`文件不存在: ${file}`);
    }
});

// 压缩文件
console.log('正在创建UPX文件...');
const output = fs.createWriteStream(UPX_FILE);
const archive = archiver('zip', {
    zlib: { level: 9 }
});

output.on('close', () => {
    console.log(`UPX文件创建成功: ${UPX_FILE}`);
    console.log(`文件大小: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);

    // 清理临时目录
    fs.removeSync(TEMP_DIR);
});

archive.on('warning', (err) => {
    if (err.code === 'ENOENT') {
        console.warn('Warning:', err);
    } else {
        throw err;
    }
});

archive.on('error', (err) => {
    throw err;
});

archive.pipe(output);

// 添加临时目录内的文件到压缩包
archive.directory(TEMP_DIR, false);

// 完成压缩
archive.finalize(); 