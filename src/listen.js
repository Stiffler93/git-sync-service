const fs = require('fs');
const path = require('path');
const git = require('./utils/git');
const ng = require('./utils/ng');
const yarn = require('./utils/yarn');
const utilities = require('./utils/utilities');


function listen(configs) {
    log('START WATCHING FOR FILE CHANGES');

    fs.watch(configs.DataDir, (eventType, filename) => {
        if (eventType === 'change') {
            log('File change was detected: ' + filename);
            if (filename.endsWith(".zip")) {
                handle(path.join(configs.DataDir, filename));
            }
        }
    })
}

function handle(filename, config) {
    git.checkout(config.ProjectPath, config.Git.source);
    git.pull(config.ProjectPath);
    git.checkout(config.ProjectPath, config.Git.target);
    git.merge(config.ProjectPath, config.Git.source);

    yarn.install(config.ProjectPath);

    utilities.clean(config.UnzipTarget);
    utilities.clean(config.DataCopyTarget);
    utilities.extract(filename, config.UnzipTarget);

    utilities.copy(config.UnzipTarget, config.DataCopyTarget);

    ng.build(config.ProjectPath);

    git.remoteSetUrl(config.ProjectPath, config.Git.target);

    git.add(config.ProjectPath, '.');

    git.commit(config.ProjectPath, config.Git.commitMessage);
    git.push(config.ProjectPath);
}

module.exports.listen = listen;