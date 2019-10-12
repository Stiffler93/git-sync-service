const fs = require('fs');
const git = require('./utils/git');
const ng = require('./utils/ng');
const npm = require('./utils/npm');


function setup(configs) {
    if (fs.existsSync(configs.ProjectPath)) {
        git.checkout(configs.ProjectPath, configs.Git.source);
        git.pull(configs.ProjectPath);
    } else {
        git.clone(configs.Git.repo, configs.ProjectPath);
        git.checkout(configs.ProjectPath, configs.Git.source);
    }

    npm.install(configs.ProjectPath);
    ng.build(configs.ProjectPath);
}

module.exports.setup = setup;