const AdmZip = require('adm-zip');
const fs = require('fs');
exports.getFileContents = function (filePath, targetDir) {
    const zip = new AdmZip(filePath);
    zip.extractAllTo(targetDir, true);
    const files = fs.readdirSync(targetDir);
    files.forEach(file => {
        if (file.endsWith('.md')) {
            fileContents = fs.readFileSync(`${targetDir}/${file}`, 'utf8');
        }
    })
    return fileContents;
}