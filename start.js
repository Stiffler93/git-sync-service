const log = require('./src/utils/logger').log;
const setup = require('./src/setup');
const listen = require('./src/listen');
const configFile = require('./config/config.json');

const config = {};
config.WorkingDir = configFile.WorkingDir;
config.DataDir = config.WorkingDir + '\\' + configFile.DataDir;
config.GitCheckoutDestination = config.WorkingDir + '\\' + configFile.GitCheckoutDestination;
config.GitProjectName = configFile.GitProjectName;
config.ProjectPath = config.GitCheckoutDestination + '\\' + config.GitProjectName;
config.UnzipTarget = config.WorkingDir + '\\' + configFile.UnzipTarget;
config.DataCopyTarget = config.GitCheckoutDestination + '\\' + config.GitProjectName + '\\' + configFile.DataCopyTarget;
config.GitSource = configFile.GitSource;
config.GitTarget = configFile.GitTarget;

log('Start service');

// ON SERVICE START
setup.setup(config);

// WATCH FOR DIRECTORY CHANGES
listen.listen(config);

process.exit(0);
