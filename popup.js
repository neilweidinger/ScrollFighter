var backgroundPage = chrome.extension.getBackgroundPage();

console.log("you've opened the popup!");
document.querySelector("#miles").innerText = backgroundPage.total;
