var totalPixels = 0;
var hitLimit = 0;

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
            hitLimit++;
            if (hitLimit % 10 == 0) {
                sendKO();
            }
        }
    });
});

// returns a distance in pixels to inches
function pixelToDist(pixels) {
    return (pixels / 227).toFixed() // MacBook Pro is 227 ppi
}

// expects a string
function displayOnBadge(distance) {
    if (distance == "10") {
        console.log("should have notification");

        chrome.notifications.create("10", {
			type : "basic",
			iconUrl : "resources/scrollFighter.png",
			title : "10 inches",
			message : "test notification"
		}, function(){});
    }

    chrome.browserAction.setBadgeText({
		text:distance
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
