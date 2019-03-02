var total = 0;

chrome.runtime.onInstalled.addListener(function() {
    console.log("Hello world");
    displayDist("____");
});

chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
        total += Math.abs(msg.data);
        displayDist(total.toFixed().toString());
        console.log("received " + msg.data);
    });
});

function displayDist(word) {
    chrome.browserAction.setBadgeText({
		text:word
	});
}
