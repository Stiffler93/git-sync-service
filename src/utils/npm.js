const info = require('./logger.js').info;
const error = require('./logger.js').error;
const exec = require('child_process').execSync;
const tc = require('./tryCatch').tc;


function install(project) {
    const command = 'cd ' + project + ' && npm install --silent';
    info(command + ';');

    tc(() => exec(command, {stdio: 'ignore'}), error);
}

module.exports.install = install;