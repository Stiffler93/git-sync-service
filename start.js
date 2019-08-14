const path = require('path');

const log = require('./src/utils/logger').log;
const setup = require('./src/setup');
const listen = require('./src/listen');
const configFile = require('./config/config.json');

const notify = require('./src/utils/notify');

const config = {};
config.WorkingDir = configFile.WorkingDir;
config.DataDir = path.join(config.WorkingDir, configFile.DataDir);
config.GitCheckoutDestination = path.join(config.WorkingDir, configFile.Git.projectName);
config.ProjectPath = path.join(config.GitCheckoutDestination, configFile.Git.projectName);
config.UnzipTarget = path.join(config.WorkingDir, configFile.UnzipTarget);
config.DataCopyTarget = path.join(config.GitCheckoutDestination, configFile.Git.projectName, configFile.DataCopyTarget);

config.Notification = configFile.Notification;
config.Git = configFile.Git;
log('Start service');

// // ON SERVICE START
// setup.setup(config);
//
// // WATCH FOR DIRECTORY CHANGES
// listen.listen(config);

// process.exit(0);
