const log = require('./logger').log;
const exec = require('child_process').execSync;

// build needs npm install but that takes too long!
function build(project) {
	const command = 'cd ' + project + ' && ng build --prod --output-path docs --base-href "/loziska/"';
	log(command + ';');
	
	exec(command);
}

module.exports.build = build;