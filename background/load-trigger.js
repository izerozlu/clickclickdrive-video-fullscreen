chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'doSomething') {
        sendResponse({result: 'Action completed'});
    }
});
