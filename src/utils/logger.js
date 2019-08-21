// const fs = require('fs');
const logging = require('../../config/config').Logging;
const log4js = require('log4js');

log4js.configure({
    appenders: {fileAppender: {type: 'fileSync', filename: logging.file, maxLogSize: 10485760, backups: 5, keepFileExt: true}},
    categories: {default: {appenders: ['fileAppender'], level: logging.level.toLowerCase()}}
});

const logger = log4js.getLogger();

function debug(text) {
    logger.debug(text);
}

function info(text) {
    // console.log(text);
    // fs.appendFile(logFile, text + '\r\n', 'utf8', err => {
    //     if (err) console.log('Error on log: ' + err)
    // });
    logger.info(text);
}

module.exports.debug = debug;
module.exports.info = info;