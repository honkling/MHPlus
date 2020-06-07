// lazy so I'm not adding multiple themes

const style = document.createElement('link');
style.href = chrome.extension.getURL('css/inject.css');
style.type = 'text/css';
style.rel = 'stylesheet';
document.head.appendChild(style);