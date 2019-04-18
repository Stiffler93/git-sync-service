const fs = require('fs');
const unzip = require('unzip');
const log = require('./logger').log;

function extractData(archive, target) {
	log('Extract data from ' + archive + ' into ' + target + ';');
	
	// see: https://github.com/EvanOxfeld/node-unzip
	fs.createReadStream(archive).pipe(unzip.Extract({ path: target }));
}

module.exports.extractData = extractData;