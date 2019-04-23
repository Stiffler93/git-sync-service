const log = require('./src/logger').log;

// build needs npm install but that takes too long!
function build(project, callback) {
	const command = 'cd ' + project + ' && ng build --prod --output-path docs --base-href "/loziska/"';
	log(command + ';');
	
	exec(command, {}, callback);
}

module.exports.build = build;