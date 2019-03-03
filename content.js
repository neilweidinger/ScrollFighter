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

        var overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.zIndex = "200000000";
        overlay.style.backgroundColor = "rgb(153,26,4,0.5)";

        var googleFontLink = document.createElement("link");
        googleFontLink.setAttribute("href", "https://fonts.googleapis.com/css?family=Press+Start+2P");
        googleFontLink.setAttribute("rel", "stylesheet");

        var ko = document.createElement("h1");
        var text = document.createTextNode("KO");
        ko.style.fontFamily = "'Press Start 2P', cursive";
        ko.style.color = "white";
        ko.style.textAlign = "center";
        ko.style.fontSize = "230px";

        document.head.appendChild(googleFontLink);
        document.body.appendChild(overlay);
        overlay.appendChild(ko);
        ko.appendChild(text);
    });
});
