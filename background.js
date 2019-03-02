chrome.runtime.onInstalled.addListener(function() {
    console.log("Hello world");
    displayDist("____");
});

chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
        if (msg.joke == "yes shift") {
            displayDist("SHFT");
            console.log("received shift");
        }
        else {
            displayDist("NORM");
            console.log("received norm");
        }
    });
});

function displayDist(word) {
    chrome.browserAction.setBadgeText({
		text:word
	});
}
