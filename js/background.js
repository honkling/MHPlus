chrome.webNavigation.onDOMContentLoaded.addListener(({ tabId, url }) => {
    if (!/https?:\/\/(.+\.)?minehut\.com\.?(\/.*)?/.test(url)) return;
    chrome.scripting.executeScript({
        target: { tabId },
        files: ["js/inject.js"],
    });
});