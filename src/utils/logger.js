const config = require('../../config/config');
const sendMail = require('./email').sendMail;
const log4js = require('log4js');

log4js.configure({
    appenders: {
        fileAppender: {
            type: 'fileSync',
            filename: config.Logging.file,
            maxLogSize: 10485760,
            backups: 5,
            keepFileExt: true
        }
    },
    categories: {default: {appenders: ['fileAppender'], level: config.Logging.level.toLowerCase()}}
});

const logger = log4js.getLogger();

function debug(text) {
    logger.debug(text);
}

function info(text) {
    logger.info(text);
}

function error(text, error) {
    logger.error(text);
    const errorString = error ? JSON.stringify(error) : "";
    if (error) logger.error(errorString);

    if (config.Email.onErrors) {
        sendMail(config, text, errorString);
    }
}

module.exports.debug = debug;
module.exports.info = info;
module.exports.error = error;