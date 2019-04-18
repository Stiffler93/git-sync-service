const fs = require('fs');
const path = require('path');
const log = require('./logger').log;

//not quite working; fails on directory delete
function clean(folder, callback) {
	log('Clean: ' + folder);
	const files = fs.readdirSync(folder);

	for (const file of files) {
		const filePath = path.join(folder, file);
		
		const stats = fs.statSync(filePath);
			
		if (stats.isFile()) {
			log('Delete: ' + file);
			fs.unlinkSync(filePath);
		} else if (stats.isDirectory()) {
			clean(filePath, () => {
				log('Remove empty directory: ' + folder);
				fs.rmdirSync(filePath);
			});
		} else log('WARNING: ' + file + ' is neither a file nor a directory!');
	}
	
	if(callback) callback();
}

module.exports.clean = clean;