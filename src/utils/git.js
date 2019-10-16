const info = require('./logger.js').info;
const error = require('./logger').error;
const exec = require('child_process').execSync;
const tc = require('./tryCatch').tc;

function clone(repo, targetDir) {
    const command = 'git clone ' + repo + ' ' + targetDir;
    info(command + ';');

    exec(command);
}

function checkout(project, branch) {
    const command = 'cd ' + project + ' && git checkout -B ' + branch;
    info(command + ';');

    tc(() => exec(command), error);
}

function add(project, file) {
    const command = 'cd ' + project + ' && git add ' + file;
    info(command + ';');

    tc(() => exec(command), error);
}

function commit(project, message) {
    const command = 'cd ' + project + ' && git commit -m "' + message + '"';
    info(command + ';');

    tc(() => exec(command), error, false);
}

function push(project, branch) {
    const command = 'cd ' + project + ' && git push --force --set-upstream origin ' + branch;
    info(command + ';');

    tc(() => exec(command), error);
}

function pull(project) {
    const command = 'cd ' + project + ' && git pull --force';
    info(command + ';');

    tc(() => exec(command), error);
}

function merge(project, source) {
    const command = 'cd ' + project + ' && git merge -X theirs ' + source;
    info(command + ';');

    tc(() => exec(command), error);
}

module.exports = {
    clone: clone,
    checkout: checkout,
    add: add,
    commit: commit,
    push: push,
    pull: pull,
    merge: merge,
};
