var backgroundPage = chrome.extension.getBackgroundPage();

function updateScrollTotal() {
    document.querySelector("#miles").innerText = backgroundPage.pixelToDist(backgroundPage.totalPixels) + " inches";
}
setInterval(updateScrollTotal, 10);
