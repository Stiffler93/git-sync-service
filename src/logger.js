const fs = require('fs');
const logFile = require('../config/config').LogFile;

function log(text) {
	console.log(text);
	fs.appendFile(logFile, text + '\r\n', 'utf8', err => {});
}

module.exports.log = log;