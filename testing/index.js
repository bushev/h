'use strict';

const DEVICE_ID = `e6a816e65a8f014444a5d471ffddd7f281ccc31b59374cbb19671823cd493cf0`;

const PushNotifications = require('node-pushnotifications');


const settings = {
    apn: {
        token: {
            key: './AuthKey_C6787YVKU5.p8', // optionally: fs.readFileSync('./certs/key.p8')
            keyId: 'C6787YVKU5',
            teamId: 'Y353ZXGF88',
        },
        production: false // true for APN production environment, false for APN sandbox environment,
    },
    isAlwaysUseFCM: false, // true all messages will be sent through node-gcm (which actually uses FCM)
};

const push = new PushNotifications(settings);

const registrationIds = [DEVICE_ID];

const data = {
    title: 'New push notification', // REQUIRED for Android
    topic: 'vk.hackathon', // REQUIRED for iOS (apn and gcm)
    /* The topic of the notification. When using token-based authentication, specify the bundle ID of the app.
     * When using certificate-based authentication, the topic is usually your app's bundle ID.
     * More details can be found under https://developer.apple.com/documentation/usernotifications/setting_up_a_remote_notification_server/sending_notification_requests_to_apns
     */
    body: 'Powered by AppFeel',
    custom: {
        sender: 'AppFeel',
    },
    priority: 'high', // gcm, apn. Supported values are 'high' or 'normal' (gcm). Will be translated to 10 and 5 for apn. Defaults to 'high'
    collapseKey: '', // gcm for android, used as collapseId in apn
    contentAvailable: true, // gcm, apn. node-apn will translate true to 1 as required by apn.
    delayWhileIdle: true, // gcm for android
    restrictedPackageName: '', // gcm for android
    dryRun: false, // gcm for android
    icon: '', // gcm for android
    tag: '', // gcm for android
    color: '', // gcm for android
    clickAction: '', // gcm for android. In ios, category will be used if not supplied
    locKey: '', // gcm, apn
    locArgs: '', // gcm, apn
    titleLocKey: '', // gcm, apn
    titleLocArgs: '', // gcm, apn
    retries: 1, // gcm, apn
    encoding: '', // apn
    badge: 2, // gcm for ios, apn
    sound: 'ping.aiff', // gcm, apn
    alert: { // apn, will take precedence over title and body
        title: 'title',
        body: 'body'
        // details: https://github.com/node-apn/node-apn/blob/master/doc/notification.markdown#convenience-setters
    },
    /*
     * A string is also accepted as a payload for alert
     * Your notification won't appear on ios if alert is empty object
     * If alert is an empty string the regular 'title' and 'body' will show in Notification
     */
    // alert: '',
    launchImage: '', // apn and gcm for ios
    action: '', // apn and gcm for ios
    category: '', // apn and gcm for ios
    // mdm: '', // apn and gcm for ios. Use this to send Mobile Device Management commands.
    // https://developer.apple.com/library/content/documentation/Miscellaneous/Reference/MobileDeviceManagementProtocolRef/3-MDM_Protocol/MDM_Protocol.html
    urlArgs: '', // apn and gcm for ios
    truncateAtWordEnd: true, // apn and gcm for ios
    mutableContent: 0, // apn
    threadId: '', // apn
    expiry: Math.floor(Date.now() / 1000) + 28 * 86400, // seconds
    timeToLive: 28 * 86400, // if both expiry and timeToLive are given, expiry will take precedency
    headers: [], // wns
    launch: '', // wns
    duration: '', // wns
    consolidationKey: 'my notification', // ADM
};

// You can use it in node callback style
push.send(registrationIds, data, (err, result) => {
    if (err) {
        console.log(err);
    } else {
        console.log(JSON.stringify(result, null, 2));
    }
});