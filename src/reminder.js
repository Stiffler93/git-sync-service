const schedule = require('node-schedule');
const info = require('./utils/logger').info;
const notify = require('./utils/notify').notify;

function register(configs) {
    info('Schedule notification job');

    schedule.scheduleJob('0 20 8 * * 1-5', function(fireDate){
        info('Notification job triggered at ' + fireDate);
        notify(configs);
    });
}

module.exports.register = register;