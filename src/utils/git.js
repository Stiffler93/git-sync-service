const log = require('./logger.js').log;
const exec = require('child_process').execSync;

function clone(repo, to, dirname) {
	const targetDir = to + '\\' + dirname;
	log('clone ' + repo + ' into ' + targetDir + ';');
	
	const command = 'git clone ' + repo + ' ' + targetDir;
	
	exec(command);
}

function remoteSetUrl(project, url) {
	const command = 'cd ' + project + ' && git remote set-url origin ' + url;
	log(command + ';');
	
	exec(command);
}

function checkout(project, branch) {
	const command = 'cd ' + project + ' && git checkout ' + branch;
    log(command + ';');

    exec(command);
}

function add(project, file) {
	const command = 'cd ' + project + ' && git add ' + file;
	log(command + ';');
	
	exec(command);
}

function commit(project, message) {
	const command = 'cd ' + project + ' && git commit -m "' + message + '"';
	log(command + ';');
	
	exec(command);
}

function push(project) {
    const command = 'cd ' + project + ' && git push --force';
    log(command + ';');

    exec(command);
}

function pull(project) {
    const command = 'cd ' + project + ' && git pull --force';
    log(command + ';');

    exec(command);
}

function merge(project, source) {
    const command = 'cd ' + project + ' && git merge -X theirs ' + source;
    log(command + ';');

    exec(command);
}

module.exports.clone = clone;
module.exports.remoteSetUrl = remoteSetUrl;
module.exports.checkout = checkout;
module.exports.add = add;
module.exports.commit = commit;
module.exports.push = push;
module.exports.pull = pull;
module.exports.merge = merge;