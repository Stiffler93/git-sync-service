const fs = require('fs');
const git = require('./utils/git');
const ng = require('./utils/ng');
const npm = require('./utils/npm');
const info = require('./utils/logger').info;


function setup(configs) {
    info('Start project setup.');

    configs.proceed(9);

    if (fs.existsSync(configs.ProjectPath)) {
        git.checkout(configs.ProjectPath, configs.Git.source);
        git.pull(configs.ProjectPath);
    } else {
        git.clone(configs.Git.repo, configs.ProjectPath);
        git.checkout(configs.ProjectPath, configs.Git.source);
    }

    configs.proceed(11);

    npm.install(configs.ProjectPath);
    configs.proceed(15);

    ng.build(configs.ProjectPath);
    configs.proceed(23);

    info('Project setup finished.');
}

module.exports.setup = setup;