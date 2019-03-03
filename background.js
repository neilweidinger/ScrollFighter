var totalPixels = 0;

// runs when started
chrome.runtime.onInstalled.addListener(function() {
    console.log("Scroll Fighter Launched");
});

// listener for when we receive messages from content script
chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
        totalPixels += Math.abs(msg.data);
        displayOnBadge(pixelToDist(totalPixels).toString());
    });
});

// returns a distance in pixels to inches
function pixelToDist(pixels) {
    return (pixels / 227).toFixed() // MacBook Pro is 227 ppi
}

function displayOnBadge(word) {
    chrome.browserAction.setBadgeText({
		text:word
	});
}
