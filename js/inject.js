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
    forums: 'default'
}, function(items) {
    if (items.style != "default")
        loadStyle(`${items.style}.css`);
        
    if (items.forumsTheme != "default")
        loadStyle(`forums/${items.forums}.css`);
});