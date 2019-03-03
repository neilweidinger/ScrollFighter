var totalPixels = 0;
var limit = 35;
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

        if (pixelToDist(totalPixels) > limit) {
            hitLimit++;
            if (hitLimit % 5 == 0) {
                sendKO();
            }
        }
    });
});

// returns a distance in pixels to inches
function pixelToDist(pixels) {
    return (pixels / 227).toFixed() // MacBook Pro is 227 ppi
}

var currentNotification = 0;
var notifications = [
    {
        distance : 10,
        title : "10 inches",
        message : "You could have spent those 2 kilometers you just scrolled walking outside instead, shame"
    },
    {
        distance : 20,
        title : "20 inches",
        message : "Get off the computer and do something productive you nincompoop"
    },
    {
        distance : 30,
        title : "30 inches",
        message : "You've just scrolled to London and back! You have any idea how far that is?? Stop procrastinating!!!"
    },
    {
        distance : 100000000,
        title : "shouldn't reach here (sentinel value)",
        message : "kinda crappy programming practice but I'm so tired rn"
    }
]

// expects a string
function displayOnBadge(distance) {
    if (distance > notifications[currentNotification].distance) {
        sendPunch();

        var current = notifications[currentNotification];

        chrome.notifications.create({
			type : "basic",
			iconUrl : "resources/scrollFighter.png",
			title : current.title,
			message : current.message
		});

        currentNotification++;
    }

    chrome.browserAction.setBadgeText({
		text:distance
	});
}

function sendPunch() {
    chrome.tabs.query(
        {currentWindow: true, active : true}, function(tabArray) {
            let currentTabID = tabArray[0].id;
            let contentPort = chrome.tabs.connect(currentTabID, {name: "instruction"});
            contentPort.postMessage({instruction:"punch"});
        }
    );
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
