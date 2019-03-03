var port = chrome.runtime.connect({name: "scroll data"});
var previousScroll = window.pageYOffset;

var kenDiv = document.createElement("div");
kenDiv.setAttribute("id", "kenDiv");
kenDiv.style.position = "fixed";
// kenDiv.style.width = "50px";
// kenDiv.style.height = "50px";
kenDiv.style.backgroundColor = "transparent";
kenDiv.style.bottom = "20px";
kenDiv.style.left = window.innerWidth - 100 + "px";
kenDiv.style.pointerEvents = "none";
kenDiv.style.zIndex = "100000000"; // 1 less than youtube and netflix
kenDiv.style.backgroundColor = "transparent";

var kenImg = document.createElement("img");
kenDiv.appendChild(kenImg);
kenImg.setAttribute("id", "kenImg");
kenImg.style.position = "absolute";
// kenImg.style.width = "100%";
// kenImg.style.height = "100%";
kenImg.style.bottom = "0px";
kenImg.style.left = "0px";
kenImg.style.pointerEvents = "none";
kenImg.style.backgroundColor = "transparent";
kenImg.src = chrome.runtime.getURL("resources/stance.gif");

window.addEventListener ("load", function(evnt) {
    console.log("loaded!");
    document.body.appendChild(kenDiv);
});

window.addEventListener("scroll", function(evnt) {
    var dY = window.pageYOffset - previousScroll;
    previousScroll = window.pageYOffset;

    port.postMessage({data:dY});
});

chrome.runtime.onConnect.addListener(function(p) {
    p.onMessage.addListener(function(msg) {
        if (msg.instruction == "KO") {
            koStuff();
        }
        if (msg.instruction == "punch") {
            punchStuff();
        }
    });
});

function punchStuff() {
    document.querySelector("#kenImg").src = chrome.runtime.getURL("resources/punch.gif");
    document.querySelector("#kenDiv").style.left = window.innerWidth - 300 + "px";

    var punchAudio = new Audio();
    punchAudio.src = chrome.runtime.getURL("resources/punch.mp3");
    punchAudio.play();

    setTimeout(function() {
        document.querySelector("#kenImg").src = chrome.runtime.getURL("resources/stance.gif");
        document.querySelector("#kenDiv").style.left = window.innerWidth - 100 + "px";
    }, 2000);
}

function koStuff() {
    console.log("HIT LIMIT");

    var koAudio = new Audio();
    koAudio.src = chrome.runtime.getURL("resources/ko.mp3");
    koAudio.play();

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
}
