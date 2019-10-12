const fs = require('fs');
const path = require('path');
const updater = require('./updater');
const info = require('./utils/logger').info;


function listen(configs) {
    info('START WATCHING FOR FILE CHANGES');

    fs.watch(configs.DataSource, (eventType, filename) => {
        if (eventType === 'change') {
            info('File change was detected: ' + filename);
            if (filename.endsWith(".zip")) {
                updater.update(path.join(configs.DataSource, filename));
            }
        }
    })
}

module.exports.listen = listen;