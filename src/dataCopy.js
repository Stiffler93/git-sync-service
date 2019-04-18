const fs = require('fs');
const path = require('path');
const log = require('./logger').log;

function dataCopy(from, to) {
	log('Copy data from ' + from + ' to ' + to);
	const files = fs.readdirSync(from);

	for (const file of files) {
		const fromPath = path.join(from, file);
		const toPath = path.join(to, file);
		fs.copyFileSync(fromPath, toPath);
	}
	
}

module.exports.dataCopy = dataCopy;