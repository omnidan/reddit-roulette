chrome.browserAction.onClicked.addListener(function () {
    chrome.tabs.create({'url': "http://www.reddit.com/r/random/"});
});
