const exec = require('cordova/exec');

const CONFIG = {
    url: "https://pay.gw.zetapay.in/",
    target: '_blank',
    options: "location=no,hidenavigationbuttons=yes,hideurlbar=yes,hardwareback=no,fullscreen=yes",
    callbackSuccessURL: 'success',
    callbackErrorURL: 'failed',
}

var inAppBrowserRef;

let CONFIGPARAMS = {};

const startPayment = function(config, success, error) {
    Object.keys(CONFIG).forEach(function(k) {
        CONFIGPARAMS[k] = (config[k] || CONFIG[k])
    })

    if (isValidURL(CONFIGPARAMS.url)) {
        onDeviceReady(CONFIGPARAMS)
        exec(success, error, 'CESPay', 'startPayment', [CONFIGPARAMS.url]);
    } else {
        console.error('Invalid URL')
    }
};

function RegisterEvents() {
    if (typeof inAppBrowserRef != 'undefined') {
        inAppBrowserRef.addEventListener('loadstart', loadStartCallBack);
        inAppBrowserRef.addEventListener('loadstop', loadStopCallBack);
        inAppBrowserRef.addEventListener('loaderror', loadErrorCallBack);
        inAppBrowserRef.addEventListener('exit', exitCallback);
        inAppBrowserRef.addEventListener('message', messageCallBack);
    }
}

function UnregisterEvents() {
    if (typeof inAppBrowserRef != 'undefined') {
        inAppBrowserRef.removeEventListener('loadstart', loadStartCallBack);
        inAppBrowserRef.removeEventListener('loadstop', loadStopCallBack);
        inAppBrowserRef.removeEventListener('loaderror', loadErrorCallBack);
        inAppBrowserRef.removeEventListener('exit', exitCallback);
        // inAppBrowserRef.removeEventListener('message', messageCallBack);
    }
}

function onDeviceReady(CONFIGPARAMS) {
    let iab = cordova.InAppBrowser;

    const {
        url,
        target,
        options
    } = CONFIGPARAMS

    inAppBrowserRef = iab.open(url, target, options);

    RegisterEvents()

}

function loadStartCallBack(event) {
    console.debug('Loading started: ' + event.url)
}

async function loadStopCallBack(event) {
    console.debug('Loading finished: ' + event.url)
    if (await paymentChecks(event)) {
        closeIt()
    }
}

function messageCallBack(params) {
    console.debug(params, 'messageCallBack params')
    // if (event.origin !== "http://example.com")
    //   return;
}

async function paymentChecks(event) {
    let data;

    if (typeof event != 'undefined' && typeof event.url != 'undefined' && event.url) {
        if (event.url.match("https://payu.herokuapp.com/success") || event.url.includes(CONFIGPARAMS.callbackSuccessURL)) {
            data = {
                code: 'success'
            }
        } else if (event.url.includes(CONFIGPARAMS.callbackErrorURL)) {
            data = {
                code: 'error'
            }
        }

        if (typeof data != 'undefined') {
            sendMessage(JSON.stringify(data))
            await new Promise(function(resolve) {
                let timeout = setTimeout(function() {
                    clearTimeout(timeout)
                    resolve("Payment !!");
                }, 1000);
            });

            return true
        }

    }

    return false
}

function sendMessage(data) {
    inAppBrowserRef.executeScript({
        code: "\
        webkit.messageHandlers.cordova_iab.postMessage(JSON.stringify(" + data + "));"
    });
}

async function errorMessage(data) {
    sendMessage(JSON.stringify(data))

    await new Promise(function(resolve) {
        let timeout = setTimeout(function() {
            clearTimeout(timeout)
            resolve("Payment Error !!");
        }, 1000);
    });

    return true
}

function closeIt() {
    if (typeof inAppBrowserRef != 'undefined') {
        UnregisterEvents()
        inAppBrowserRef.close();
        inAppBrowserRef = undefined;
    }
}

async function loadErrorCallBack(error) {
    console.debug('Loading error: ' + error.message)
    if (await errorMessage({
            code: 'error',
            message: error.message
        })) {
        closeIt()
    }
}

async function exitCallback(event) {
    console.debug('Browser is closed...', event)
    if (await paymentChecks(event)) {
        closeIt()
    }
}

function isValidURL(str) {
    var regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(str)) {
        return true;
    } else {
        return false;
    }
}


module.exports = {
    startPayment
};