const fs = require('fs');
const config = require('./config/config.json');
const log = require('./src/logger').log;

log('Start service');

const WorkingDir = config.WorkingDir;
const DataDir = WorkingDir + '\\' + config.DataDir;
const GitCheckoutDestination = WorkingDir + '\\' + config.GitCheckoutDestination;
const GitProjectName = config.GitProjectName;
const ProjectPath = GitCheckoutDestination + '\\' + GitProjectName;
const UnzipTarget = WorkingDir + '\\' + config.UnzipTarget;
const DataCopyTarget = GitCheckoutDestination + '\\' + GitProjectName + '\\' + config.DataCopyTarget;


// WATCH FOR DIRECTORY CHANGES
fs.watch(DataDir, (eventType, filename) => {
	if(eventType === 'change') {
		log('File change was detected: ' + filename);
		if(filename.endsWith(".zip")) {
			//handle(DataDir + '\\' + filename);
		}
	}
});

