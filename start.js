const fs = require('fs');
const config = require('./config/config.json');
const log = require('./src/logger').log;
const git = require('./src/git');
const extractData = require('./src/extractData').extractData;
const clean = require('./src/cleanFolder').clean;
const dataCopy = require('./src/dataCopy').dataCopy;

console.log('Start service');

const GIT = config.GIT;
const NG = config.NG;
const WorkingDir = config.WorkingDir;
const DataDir = WorkingDir + '\\' + config.DataDir;
const GitCheckoutDestination = WorkingDir + '\\' + config.GitCheckoutDestination;
const GitProjectName = config.GitProjectName;
const GitSource = config.GitSource;
const GitTarget = config.GitTarget;
const UnzipTarget = config.UnzipTarget;
const DataCopyTarget = config.DataCopyTarget;

const projectPath = GitCheckoutDestination + '\\' + GitProjectName;


function onGitRemoteSetUrlComplete(error, stdout, stderr) {
	log('Git remoteSetUrl finished');
	if(error) log(error);
	
	git.add(projectPath, '.', function(error, stdout, stderr) {
		log('Git add finished');
		if(error) log(error);
		
		git.commit(projectPath, 'New Commit', function(error, stdout, stderr) {
			log('Git commit finished');
			if(error) log(error);
			
			git.push(projectPath);
		});
	});
}

function onGitCloneComplete(error, stdout, stderr) {
	log('Git clone finished');
	if(error) log(error);
	
	clean(DataCopyTarget);
	dataCopy(UnzipTarget, DataCopyTarget);
	
	git.remoteSetUrl(projectPath, GitTarget, onGitRemoteSetUrlComplete);
	//clean(GitCheckoutDestination);
	//clean(UnzipTarget);
}

// HANDLE CHANGES IN DIR
function handle(filename) {
	log('Trigger process for: ' + filename);
	
	extractData(filename, UnzipTarget);
	git.clone(GitSource, GitCheckoutDestination, GitProjectName, onGitCloneComplete);
}

// WATCH FOR DIRECTORY CHANGES
fs.watch(DataDir, (eventType, filename) => {
	if(eventType === 'change') {
		log('File change was detected: ' + filename);
		if(filename.endsWith(".zip")) {
			//handle(DataDir + '\\' + filename);
		}
	}
});

handle(DataDir + '\\test.zip');

