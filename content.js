var port = chrome.runtime.connect({name: "scroll data"});
var previousScroll = window.pageYOffset;

window.addEventListener("scroll", function(evnt) {
    var dY = window.pageYOffset - previousScroll;
    previousScroll = window.pageYOffset;

    port.postMessage({data:dY});
});

chrome.runtime.onConnect.addListener(function(p) {
    p.onMessage.addListener(function(msg) {
        console.log("HIT LIMIT");
    });
});
