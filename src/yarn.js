const log = require('./logger.js').log;
const exec = require('child_process').exec;

function install(project, callback) {
    const command = 'cd ' + project + ' && yarn install';
    log(command + ';');

    exec(command, {}, callback);
}

module.exports.install = install;