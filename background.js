var totalPixels = 0;
var hitLimit = false;

// runs when started
chrome.runtime.onInstalled.addListener(function() {
    console.log("Scroll Fighter Launched");
});

// listener for when we receive messages from content script
chrome.runtime.onConnect.addListener(function(port) {
    port.onMessage.addListener(function(msg) {
        totalPixels += Math.abs(msg.data);
        displayOnBadge(pixelToDist(totalPixels).toString());

        if (pixelToDist(totalPixels) > 20) {
            hitLimit = true;
            sendKO();
        }
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

function sendKO() {
    chrome.tabs.query(
        {currentWindow: true, active : true}, function(tabArray) {
            let currentTabID = tabArray[0].id;
            let contentPort = chrome.tabs.connect(currentTabID, {name: "instruction"});
            contentPort.postMessage({instruction:"KO"});
        }
    );
}
