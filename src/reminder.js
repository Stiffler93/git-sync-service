const schedule = require('node-schedule');
const info = require('./utils/logger').info;
const notify = require('./utils/notify').notify;

var job;

function register(configs) {
    info('Schedule notification job');

    job = schedule.scheduleJob('0 20 8 * * 1-5', function (fireDate) {
        info('Notification job triggered at ' + fireDate);
        notify(configs);
    });
}

function unregister() {
    info('Unschedule notification job');
    if (job) {
        job.cancel();
        job = undefined;
        info('Job was canceled');
    }
}

module.exports.register = register;
module.exports.unregister = unregister;