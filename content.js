var port = chrome.runtime.connect({name: "data"});

document.addEventListener("click", function(evnt) {
    if (evnt.shiftKey) {
        console.log("shift clicked");
        port.postMessage({data: "yes shift"});
    }
});

window.addEventListener("scroll", function(evnt) {
    console.log(window.pageYOffset);
    port.postMessage({data:window.pageYOffset.toFixed().toString()})
});
