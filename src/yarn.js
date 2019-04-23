
function install(project, callback) {
    const command = 'cd ' + project + ' && yarn install';
    log(command + ';');

    exec(command, {}, callback);
}

module.exports.install = install;