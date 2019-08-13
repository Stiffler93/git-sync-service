const log = require('./logger.js').log;
const exec = require('child_process').execSync;

function install(project) {
    const command = 'cd ' + project + ' && yarn install';
    log(command + ';');

    exec(command);
}

module.exports.install = install;