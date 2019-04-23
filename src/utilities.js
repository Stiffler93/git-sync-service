const fs = require('fs');
const path = require('path');
const log = require('./logger').log;

function copy(from, to) {
    log('Copy data from ' + from + ' to ' + to);
    const files = fs.readdirSync(from);

    for (const file of files) {
        const fromPath = path.join(from, file);
        const toPath = path.join(to, file);
        fs.copyFileSync(fromPath, toPath);
    }

}

function clean(folder, callback) {
    log('Clean: ' + folder);
    const files = fs.readdirSync(folder);

    for (const file of files) {
        const filePath = path.join(folder, file);

        const stats = fs.statSync(filePath);

        if (stats.isFile()) {
            log('Delete: ' + file);
            fs.unlinkSync(filePath);
        } else if (stats.isDirectory()) {
            clean(filePath, () => {
                log('Remove empty directory: ' + folder);
                fs.rmdirSync(filePath);
            });
        } else log('WARNING: ' + file + ' is neither a file nor a directory!');
    }

    if(callback) callback();
}

function extract(archive, target) {
    log('Extract data from ' + archive + ' into ' + target + ';');

    // see: https://github.com/EvanOxfeld/node-unzip
    fs.createReadStream(archive).pipe(unzip.Extract({ path: target }));
}

module.exports.extract = extract;
module.exports.clean = clean;
module.exports.copy = copy;
