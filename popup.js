var backgroundPage = chrome.extension.getBackgroundPage();

function updateScrollTotal() {
    document.querySelector("#miles").innerText = backgroundPage.total;
}
setInterval(updateScrollTotal, 10);
