function loadStyle(url) {
    const style = document.createElement('link');
    style.href = chrome.extension.getURL(`css/${url}`);
    style.type = 'text/css';
    style.rel = 'stylesheet';
    document.head.appendChild(style);
}

loadStyle('common.css');
loadStyle('purple.css');