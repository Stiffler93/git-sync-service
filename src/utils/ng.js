const info = require('./logger').info;
const error = require('./logger').error;
const exec = require('child_process').execSync;
const tc = require('./tryCatch').tc;


function build(project) {
    const command = 'cd ' + project + ' && ng build --prod --output-path docs --base-href "/loziska/"';
    info(command + ';');

    tc(() => exec(command), error);
}

module.exports.build = build;