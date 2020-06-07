// TODO: Add support for multiple themes

const style = document.createElement('link');
style.href = chrome.extension.getURL('css/purple.css');
style.type = 'text/css';
style.rel = 'stylesheet';
document.head.appendChild(style);