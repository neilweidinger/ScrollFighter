var backgroundPage = chrome.extension.getBackgroundPage();

function updateScrollTotal() {
    if (backgroundPage.totalPixels != null) {
        document.querySelector("#miles").innerText = "YOU'VE SCROLLED " + backgroundPage.pixelToDist(backgroundPage.totalPixels) + " INCHES";
    }
}
setInterval(updateScrollTotal, 10);
