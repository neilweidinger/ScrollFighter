chrome.runtime.onInstalled.addListener(function() {
    console.log("Hello world");
    displayDist("____");
});

chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
        if (msg.data == "yes shift") {
            displayDist("SHFT");
            console.log("received shift");
        }
        else {
            displayDist(msg.data);
            console.log("received " + msg.data);
        }
    });
});

function displayDist(word) {
    chrome.browserAction.setBadgeText({
		text:word
	});
}
