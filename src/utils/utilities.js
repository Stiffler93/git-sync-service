const fs = require('fs');
const path = require('path');
const info = require('./logger').info;

function copy(from, to) {
    info('Copy data from ' + from + ' to ' + to);
    const files = fs.readdirSync(from);

    for (const file of files) {
        const fromPath = path.join(from, file);
        const toPath = path.join(to, file);
        fs.copyFileSync(fromPath, toPath);
    }
}

function clean(folder) {
    info('Clean: ' + folder);
    const files = fs.readdirSync(folder);

    for (const file of files) {
        const filePath = path.join(folder, file);

        const stats = fs.statSync(filePath);

        if (stats.isFile()) {
            fs.unlinkSync(filePath);
        } else if (stats.isDirectory()) {
            clean(filePath, fs.rmdirSync(filePath));
        } else info('WARNING: ' + file + ' is neither a file nor a directory!');
    }
}

function enhanceFileWithDate(file) {
    const parts = file.split('.');
    const dateString = new Date().toISOString().substr(0, 10);
    return parts[0] + '_' + dateString + '.' + parts[1];
}


module.exports.clean = clean;
module.exports.copy = copy;
module.exports.enhanceFileWithDate = enhanceFileWithDate;
