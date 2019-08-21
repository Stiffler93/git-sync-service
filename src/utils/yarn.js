const info = require('./logger.js').info;
const exec = require('child_process').execSync;

function install(project) {
    const command = 'cd ' + project + ' && yarn install';
    info(command + ';');

    exec(command);
}

module.exports.install = install;