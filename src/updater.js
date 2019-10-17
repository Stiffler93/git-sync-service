const git = require('./utils/git');
const ng = require('./utils/ng');
const npm = require('./utils/npm');
const utilities = require('./utils/utilities');
const info = require('./utils/logger').info;

function update(config) {
    info('Start updating git:');
    git.checkout(config.ProjectPath, config.Git.source);
    git.pull(config.ProjectPath);
    git.checkout(config.ProjectPath, config.Git.target);
    git.merge(config.ProjectPath, config.Git.source);

    config.proceed(10);

    npm.install(config.ProjectPath);

    config.proceed(5);

    utilities.clean(config.DataCopyTarget);
    utilities.copy(config.DataSource, config.DataCopyTarget, '.csv');
    utilities.clean(config.DataSource);

    config.proceed(2);

    ng.build(config.ProjectPath);
    utilities.create404Page(config);
    utilities.copy(config.BuildTarget, config.ProjectPath);

    config.proceed(6);

    git.add(config.ProjectPath, '.');
    git.commit(config.ProjectPath, config.Git.commitMessage);
    git.push(config.ProjectPath, config.Git.target);

    config.proceed(1);

    info('Update succeeded.');
}

module.exports.update = update;