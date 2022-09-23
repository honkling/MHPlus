browser.webNavigation.onDOMContentLoaded.addListener(({ tabId, url }) => {
    if (!/https?:\/\/(.+\.)?minehut\.com\.?(\/.*)?/.test(url)) return;
    browser.scripting.executeScript({
        target: { tabId },
        files: ["js/inject.js"],
    });
});

browser.webRequest.onBeforeRequest.addListener(
    () => {
        return { cancel: true };
    },
    {
        urls: ["https://video.minehut.com/*"],
    },
    ["blocking"],
);