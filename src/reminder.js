const schedule = require('node-schedule');
const info = require('./utils/logger').info;
const notify = require('./utils/notify').notify;

let job;

function register(configs) {
    info('Schedule notification job');

    const times = configs.Notification.time.split(':');
    const hour = format(times[0]);
    const minutes = format(times[1]);

    const notificationTime = '0 %minutes% %hour% * * 1-5'.replace('%minutes%', minutes).replace('%hour%', hour);
    info('Time set: ' + notificationTime);

    job = schedule.scheduleJob(notificationTime, function (fireDate) {
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

function format(time) {
    return time.startsWith('0') ? time.substr(1) : time;
}

module.exports.register = register;
module.exports.unregister = unregister;