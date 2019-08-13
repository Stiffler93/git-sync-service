const fs = require('fs');
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
                handle(configs.DataDir + '\\' + filename);
            }
        }
    })
}

function handle(filename, configs) {
    git.remoteSetUrl(configs.ProjectPath, configs.GitSource);

    git.pull(configs.ProjectPath);

    yarn.install(configs.ProjectPath);

    utilities.clean(configs.UnzipTarget);
    utilities.clean(configs.DataCopyTarget);
    utilities.extract(filename, configs.UnzipTarget);

    utilities.copy(configs.UnzipTarget, configs.DataCopyTarget);

    ng.build(configs.ProjectPath);

    git.remoteSetUrl(configs.ProjectPath, configs.GitTarget);

    git.add(configs.ProjectPath, '.');

    git.commit(configs.ProjectPath, 'Data Update');
    git.push(configs.ProjectPath);
}

module.exports.listen = listen;