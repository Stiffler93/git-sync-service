const log = require('./logger.js').log;
const exec = require('child_process').exec;

function clone(repo, to, dirname, callback) {
	const targetDir = to + '\\' + dirname;
	log('clone ' + repo + ' into ' + targetDir + ';');
	
	const command = 'git clone ' + repo + ' ' + targetDir;
	
	exec(command, {}, callback);
}

function remoteSetUrl(project, url, callback) {
	const command = 'cd ' + project + ' && git remote set-url origin ' + url;
	log(command + ';');
	
	exec(command, {}, callback);
}

function add(project, file, callback) {
	const command = 'cd ' + project + ' && git add ' + file;
	log(command + ';');
	
	exec(command, {}, callback);
}

function commit(project, message, callback) {
	const command = 'cd ' + project + ' && git commit -m "' + message + '"';
	log(command + ';');
	
	exec(command, {}, callback);
}

function push(project, callback) {
	const command = 'cd ' + project + ' && git push --force';
	log(command + ';');
	
	log('Git push is disabled meanwhile as it is too dangerous!');
	//exec(, {}, callback);
}

module.exports.clone = clone;
module.exports.remoteSetUrl = remoteSetUrl;
module.exports.add = add;
module.exports.commit = commit;
module.exports.push = push;