var port = chrome.runtime.connect({name: "data"});
var previousScroll = window.pageYOffset;

document.addEventListener("click", function(evnt) {
    if (evnt.shiftKey) {
        console.log("shift clicked");
        port.postMessage({data: "yes shift"});
    }
});

window.addEventListener("scroll", function(evnt) {
    console.log("current:" + window.pageYOffset);
    console.log("previous: " + previousScroll);

    var dY = window.pageYOffset - previousScroll;
    previousScroll = window.pageYOffset;

    port.postMessage({data:dY});
});
