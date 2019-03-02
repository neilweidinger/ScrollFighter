var port = chrome.runtime.connect({name: "data"});

console.log("please work");

document.addEventListener("click", function(e) {
    if (e.shiftKey) {
        console.log("shift clicked");
        port.postMessage({joke: "yes shift"});
    }
    else {
        console.log("normal clicked");
        port.postMessage({joke: "no shift"});
    }
});
