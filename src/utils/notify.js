const path = require('path');
const info = require('./logger').info;
const WindowsToaster = require('node-notifier').WindowsToaster;
const rootFolder = path.dirname(require.main.filename);

const notifier = new WindowsToaster({
    withFallback: true
});

const icon = path.join(rootFolder, 'assets', 'sync.png');

function notify(config) {
    info('notify');
    notifier.notify(
        {
            title: config.Notification.title, // String. Required
            message: config.Notification.message, // String. Required if remove is not defined
            icon: icon, // String. Absolute path to Icon
            sound: 'Notification.Reminder', // Bool | String (as defined by http://msdn.microsoft.com/en-us/library/windows/apps/hh761492.aspx)
            wait: true, // Bool. Wait for User Action against Notification or times out
            // appID: 'aho',
            id: config.Notification.ID, // Number. ID to use for closing notification.
            install: void 0 // String (path, application, app id).  Creates a shortcut <path> in the start menu which point to the executable <application>, appID used for the notifications.
        },
        function (error, response) {
        }
    );
}

module.exports.notify = notify;