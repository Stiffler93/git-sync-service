const fs = require('fs');
const config = require('./config/config.json');
const log = require('./src/logger').log;

const git = require('./src/git');
const ng = require('./src/ng');
const yarn = require('./src/yarn');
const utilities = require('./src/utilities');

const WorkingDir = config.WorkingDir;
const DataDir = WorkingDir + '\\' + config.DataDir;
const GitCheckoutDestination = WorkingDir + '\\' + config.GitCheckoutDestination;
const GitProjectName = config.GitProjectName;
const ProjectPath = GitCheckoutDestination + '\\' + GitProjectName;
const UnzipTarget = WorkingDir + '\\' + config.UnzipTarget;
const DataCopyTarget = GitCheckoutDestination + '\\' + GitProjectName + '\\' + config.DataCopyTarget;
const GitSource = config.GitSource;
const GitTarget = config.GitTarget;

log('Start service');

// ON SERVICE START
if (fs.existsSync(ProjectPath)) {
    git.remoteSetUrl(ProjectPath, GitSource, (error) => {
        if (error) {
            log('ERROR: git remote set-url: ' + error);
            return;
        }

        git.pull(ProjectPath, (error) => {
            if (error) {
                log('git pull: ' + error);
                return;
            }

            updateProject();
        });
    });
} else {
    git.clone(GitSource, GitCheckoutDestination, GitProjectName, (error) => {
        if (error) {
            log('git clone: ' + error);
            return;
        }

        updateProject();
    });
}

function updateProject() {
    yarn.install(ProjectPath, (error) => {
        if (error) {
            log('Yarn install: ' + error);
            return;
        }

        ng.build(ProjectPath, (error) => {
            if (error) {
                log('ng build: ' + error);
                return;
            }

            startWatchingForChanges();
        })
    })
}

// WATCH FOR DIRECTORY CHANGES
function startWatchingForChanges() {
    log('START WATCHING FOR FILE CHANGES');

    fs.watch(DataDir, (eventType, filename) => {
        if (eventType === 'change') {
            log('File change was detected: ' + filename);
            if (filename.endsWith(".zip")) {
                handle(DataDir + '\\' + filename);
            }
        }
    })
}

function handle(filename) {
    git.remoteSetUrl(ProjectPath, GitSource, (error) => {
        if (error) {
            log('ERROR: git remote set-url: ' + error);
            return;
        }

        git.pull(ProjectPath, (error) => {
            if (error) {
                log('ERROR: git pull: ' + error);
                return;
            }

            yarn.install(ProjectPath, (error) => {
                if (error) {
                    log('ERROR: yarn install: ' + error);
                    return;
                }

                utilities.clean(UnzipTarget);
                utilities.clean(DataCopyTarget);
                utilities.extract(filename, UnzipTarget, () => {
                    utilities.copy(UnzipTarget, DataCopyTarget);

                    ng.build(ProjectPath, (error) => {
                        if (error) {
                            log('ERROR: ng build: ' + error);
                            return;
                        }

                        git.remoteSetUrl(ProjectPath, GitTarget, (error) => {
                            if (error) {
                                log('ERROR: git remote set-url: ' + error);
                                return;
                            }

                            git.add(ProjectPath, '.', (error) => {
                                if (error) {
                                    log('ERROR: git add: ' + error);
                                    return;
                                }

                                git.commit(ProjectPath, 'Data Update', (error) => {
                                    if (error) {
                                        log('ERROR: git commit: ' + error);
                                        return;
                                    }

                                    git.push(ProjectPath, (error) => {
                                        if (error) {
                                            log('ERROR: git push: ' + error);
                                        }
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}
