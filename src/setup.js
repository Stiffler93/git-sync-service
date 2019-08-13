const fs = require('fs');
const git = require('./utils/git');
const ng = require('./utils/ng');
const yarn = require('./utils/yarn');


function setup(configs) {
    if (fs.existsSync(configs.ProjectPath)) {
        git.remoteSetUrl(configs.ProjectPath, configs.GitSource);
        git.pull(configs.ProjectPath);
    } else {
        git.clone(configs.GitSource, configs.GitCheckoutDestination, configs.GitProjectName);
    }

    yarn.install(configs.ProjectPath);
    ng.build(configs.ProjectPath);
}

module.exports.setup = setup;