// reddit-roulette - roulette.js - where the magic happens

// maintain state in the background
var tabId = null;

// check if a tab id exists in the chrome instance
// thanks to some guy from stackoverflow for posting this snippet: http://stackoverflow.com/a/16572307
function checkTab(tabId, onExists, onNotExists) {
    chrome.windows.getAll({populate: true}, function (windows) {
        for(var i=0, window; window = windows[i]; i++) {
            for(var j=0, tab; tab = window.tabs[j]; j++) {
                if (tab.id == tabId) {
                    onExists && onExists(tab);
                    return;
                }
            }
        }
        onNotExists && onNotExists();
    });
}

// reload the tab by setting the url to /r/random again
// using the reload function would reload the randomly selected subreddit page
function reloadTab(tab) {
    chrome.tabs.update(tab.id, {url: "http://www.reddit.com/r/random"});
}

// create a new tab
function createTab() {
    chrome.tabs.create({url: "http://www.reddit.com/r/random/"}, function (tab) {
        tabId = tab.id;
    });
}

chrome.browserAction.onClicked.addListener(function () {
    if (tabId != null) {
        // check if tab is still active, then reload or create new tab
        checkTab(tabId, reloadTab, createTab);
    } else createTab(); // tabId not set, create new tab
});
