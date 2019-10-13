const git = require('./utils/git');
const ng = require('./utils/ng');
const npm = require('./utils/npm');
const utilities = require('./utils/utilities');

function update(config) {
    git.checkout(config.ProjectPath, config.Git.source);
    git.pull(config.ProjectPath);
    git.checkout(config.ProjectPath, config.Git.target);
    git.merge(config.ProjectPath, config.Git.source);

    npm.install(config.ProjectPath);

    utilities.clean(config.DataCopyTarget);
    utilities.copy(config.DataSource, config.DataCopyTarget, '.csv');
    utilities.clean(config.DataSource);

    ng.build(config.ProjectPath);
    utilities.create404Page(config);
    utilities.copy(config.BuildTarget, config.ProjectPath);

    git.add(config.ProjectPath, '.');
    git.commit(config.ProjectPath, config.Git.commitMessage);
    git.push(config.ProjectPath, config.Git.target);
}

module.exports.update = update;