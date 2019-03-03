var backgroundPage = chrome.extension.getBackgroundPage();

function updateScrollTotal() {
    if (backgroundPage.totalPixels != null) {
        document.querySelector("#miles").innerText = backgroundPage.pixelToDist(backgroundPage.totalPixels) + " inches";
    }

    // if (backgroundPage.hitLimit) {
        // var para = document.createElement("P");
        // var t = document.createTextNode("KO");
        // para.appendChild(t);
        // document.querySelector("#ko").appendChild(para);
    // }
}
setInterval(updateScrollTotal, 10);
