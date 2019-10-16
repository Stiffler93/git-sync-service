const config = require('../../config/config');
const sendMail = require('./email').sendMail;
const log4js = require('log4js');

log4js.configure({
    appenders: {
        fileAppender: {
            type: 'fileSync',
            filename: enhanceFileWithDate(config.Logging.file),
            maxLogSize: 10485760,
            backups: 5,
            keepFileExt: true
        }
    },
    categories: {default: {appenders: ['fileAppender'], level: config.Logging.level.toLowerCase()}}
});

const logger = log4js.getLogger();

function debug(text) {
    text = text === 'string' ? text : JSON.stringify(text);
    logger.debug(text);
}

function info(text) {
    text = text === 'string' ? text : JSON.stringify(text);
    logger.info(text);
}

function error(text, error) {
    text = text === 'string' ? text : JSON.stringify(text);
    logger.error(text);
    let errorString = error ? JSON.stringify(error) : "";
    if (error) logger.error(errorString);

    if (config.Email.onErrors) {
        if (!error) errorString = text;
        const subject = error ? text : 'Error occured in git-sync-service.';
        const content = error ? errorString : text;
        sendMail(config, subject, content);
    }
}

function enhanceFileWithDate(file) {
    const parts = file.split('.');
    const dateString = new Date().toISOString().substr(0, 10);
    return parts[0] + '_' + dateString + '.' + parts[1];
}

module.exports.debug = debug;
module.exports.info = info;
module.exports.error = error;