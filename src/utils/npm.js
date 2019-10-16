const info = require('./logger.js').info;
const error = require('./logger.js').error;
const exec = require('child_process').execSync;
const tc = require('./tryCatch').tc;


function install(project) {
    const command = 'cd ' + project + ' && npm install';
    info(command + ';');

    tc(() => exec(command), error);
}

module.exports.install = install;