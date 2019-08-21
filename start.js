const path = require('path');

const info = require('./src/utils/logger').info;
const setup = require('./src/setup');
const listen = require('./src/listen');
const reminder = require('./src/reminder');
const configFile = require('./config/config.json');
const enhanceFileWithDate = require('./src/utils/utilities').enhanceFileWithDate;

const config = {};
config.WorkingDir = configFile.WorkingDir;
config.DataDir = path.join(config.WorkingDir, configFile.DataDir);
config.GitCheckoutDestination = path.join(config.WorkingDir, configFile.Git.projectName);
config.ProjectPath = path.join(config.GitCheckoutDestination, configFile.Git.projectName);
config.UnzipTarget = path.join(config.WorkingDir, configFile.UnzipTarget);
config.DataCopyTarget = path.join(config.GitCheckoutDestination, configFile.Git.projectName, configFile.DataCopyTarget);

config.Notification = configFile.Notification;
config.Git = configFile.Git;
config.Email = configFile.Email;
config.Logging = configFile.Logging;
config.Logging.file = enhanceFileWithDate(config.Logging.file);

info('Start service');

// // ON SERVICE START
// setup.setup(config);

// SCHEDULE NOTIFICATION
reminder.register(config);

// WATCH FOR DIRECTORY CHANGES
listen.listen(config);

// SHUTDOWN HOOKS
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

function shutdown(signal) {
    info('Received: ' + signal);
    reminder.unregister();
    info('End service');

    process.exit(0);
}
