const info = require('./logger.js').info;
const error = require('./logger').error;
const exec = require('child_process').execSync;
const tc = require('./tryCatch').tc;

function clone(repo, targetDir) {
    const command = 'git clone ' + repo + ' ' + targetDir + ' --quiet';
    info(command + ';');

    exec(command, {stdio: 'ignore'});
}

function checkout(project, branch) {
    const command = 'cd ' + project + ' && git checkout -B ' + branch + ' --quiet';
    info(command + ';');

    tc(() => exec(command, {stdio: 'ignore'}), error);
}

function add(project, file) {
    const command = 'cd ' + project + ' && git add ' + file;
    info(command + ';');

    tc(() => exec(command, {stdio: 'ignore'}), error);
}

function commit(project, message) {
    const command = 'cd ' + project + ' && git commit -m "' + message + '"' + ' --quiet';
    info(command + ';');

    tc(() => exec(command, {stdio: 'ignore'}), error, false);
}

function push(project, branch) {
    const command = 'cd ' + project + ' && git push --force --set-upstream origin ' + branch + ' --quiet';
    info(command + ';');

    tc(() => exec(command, {stdio: 'ignore'}), error);
}

function pull(project) {
    const command = 'cd ' + project + ' && git reset --hard origin/master && git pull';
    info(command + ';');

    tc(() => exec(command, {stdio: 'ignore'}), error);
}

function merge(project, source) {
    const command = 'cd ' + project + ' && git merge -X theirs ' + source + ' --quiet';
    info(command + ';');

    tc(() => exec(command, {stdio: 'ignore'}), error);
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
