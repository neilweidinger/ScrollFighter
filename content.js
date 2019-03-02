var port = chrome.runtime.connect({name: "data"});
var previousScroll = window.pageYOffset;

window.addEventListener("scroll", function(evnt) {
    console.log("current:" + window.pageYOffset);
    console.log("previous: " + previousScroll);

    var dY = window.pageYOffset - previousScroll;
    previousScroll = window.pageYOffset;

    port.postMessage({data:dY});
});
