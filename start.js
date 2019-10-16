const path = require('path');

const info = require('./src/utils/logger').info;
const setup = require('./src/setup');
const updater = require('./src/updater');
const CSV = require('./src/utils/CSV');
const configFile = require('./config/config.json');

const config = {};
config.WorkingDir = configFile.WorkingDir;
config.GitCheckoutDestination = path.join(config.WorkingDir, configFile.GitCheckoutDestination);
config.ProjectPath = path.join(config.GitCheckoutDestination, configFile.Git.projectName);
config.DataSource = path.join(config.WorkingDir, configFile.DataSource);
config.DataCopyTarget = path.join(config.GitCheckoutDestination, configFile.Git.projectName,
    configFile.DataCopyTarget.split('/').join(path.sep));
config.BuildTarget = path.join(config.GitCheckoutDestination, configFile.Git.projectName, 'docs');

config.Notification = configFile.Notification;
config.Git = configFile.Git;
config.Email = configFile.Email;
config.Logging = configFile.Logging;
config.CSV = configFile.CSV;

info('Start service');
info({'Config': config});

// // ON SERVICE START
setup.setup(config);

// Create and process data to CSV
CSV.prepare(config);

// UPDATE REPO
updater.update(config);
