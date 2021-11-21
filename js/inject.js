function loadStyle(url) {
    const style = document.createElement('link');
    style.href = chrome.runtime.getURL(`css/${url}`);
    style.type = 'text/css';
    style.rel = 'stylesheet';
    document.head.appendChild(style);
}

loadStyle('common.css');

const isFirefox = typeof InstallTrigger !== 'undefined';

if(!isFirefox) {
    // it's probably chrome or chrome based
    chrome.storage.sync.get([
        'style',
    ], function (items) {
        if (items.style != "default" && items.style != "undefined")
            loadStyle(`${items.style}.css`);
    });
} else {
    // it's firefox :)
    browser.storage.local.get([
        'style',
    ], function(items) {
        if (items.style != "default" && items.style != "undefined")
            loadStyle(`${items.style}.css`);
    });
}