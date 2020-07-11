function loadStyle(url) {
    const style = document.createElement('link');
    style.href = chrome.runtime.getURL(`css/${url}`);
    style.type = 'text/css';
    style.rel = 'stylesheet';
    document.head.appendChild(style);
}

loadStyle('common.css');

chrome.storage.sync.get({
    style: 'blue',
}, function(items) {
    if (items.style != "default")
        loadStyle(`${items.style}.css`);
});