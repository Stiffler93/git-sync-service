const info = require('./logger').info;
const error = require('./logger').error;
const exec = require('child_process').execSync;
const tc = require('./tryCatch').tc;


function build(project) {
    const command = 'cd ' + project + ' && ng build --prod --output-path docs --base-href "/loziska/" --no-progress';
    info(command + ';');

    tc(() => exec(command, {stdio: 'ignore'}), error);
}

module.exports.build = build;