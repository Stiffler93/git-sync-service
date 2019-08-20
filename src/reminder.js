const schedule = require('node-schedule');
const notify = require('./utils/notify').notify;

function register(configs) {

    schedule.scheduleJob('0 1 * * *', function(fireDate){
        notify(configs);
    });
}

module.exports.register = register;