const info = require('./logger').info;
const exec = require('child_process').execSync;

// build needs npm install but that takes too long!
function build(project) {
	const command = 'cd ' + project + ' && ng build --prod --output-path docs --base-href "/loziska/"';
	info(command + ';');
	
	exec(command);
}

module.exports.build = build;