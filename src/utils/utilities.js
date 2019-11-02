const fs = require('fs');
const path = require('path');
const info = require('./logger').info;
const debug = require('./logger').debug;

function copy(from, to, filetype) {
    info('Copy data from ' + from + ' to ' + to);
    const files = fs.readdirSync(from);

    for (const file of files) {
        if (filetype && !file.endsWith(filetype))
            continue;

        const fromPath = path.join(from, file);
        const toPath = path.join(to, file);

        const stats = fs.statSync(fromPath);
        if (stats.isDirectory()) {
            if (!fs.existsSync(toPath)) fs.mkdirSync(toPath);
            copy(fromPath, toPath, filetype);
            continue;
        }

        debug('Copy ' + fromPath + ' to ' + toPath);
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

function create404Page(config) {
    const fromPath = path.join(config.BuildTarget, 'index.html');
    const toPath = path.join(config.BuildTarget, '404.html');
    fs.copyFileSync(fromPath, toPath);
}


module.exports.clean = clean;
module.exports.copy = copy;
module.exports.create404Page = create404Page;
