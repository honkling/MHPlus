function loadStyle(url) {
    const style = document.createElement('link');
    style.href = chrome.runtime.getURL(`css/${url}`);
    style.type = 'text/css';
    style.rel = 'stylesheet';
    document.head.appendChild(style);
}

function loadCustomStyle({ customStyle }) {
    const { backgroundColor, foregroundColor, primaryColor, selectColor, textColor, dangerColor } = customStyle;
    const root = document.querySelector(":root");
    root.style.setProperty("--mh-background-base", backgroundColor);
    root.style.setProperty("--mh-blob-base", foregroundColor);
    root.style.setProperty("--mh-primary-base", primaryColor);
    root.style.setProperty("--mh-select-base", selectColor);
    root.style.setProperty("--mh-text-base", textColor);
    root.style.setProperty("--mh-danger-base", dangerColor);
}

loadStyle('common.css');

const isFirefox = typeof InstallTrigger !== 'undefined';

function storageCallback(items) {
    if (items.style !== "default" && items.style !== "undefined" && items.style !== "custom")
        loadStyle(`${items.style}.css`);
    else if (items.style === "custom")
        loadCustomStyle(items);
}

if(!isFirefox) {
    // it's probably chrome or chrome based
    chrome.storage.sync.get([
        'style',
        'customStyle',
    ], storageCallback);
} else {
    // it's firefox :)
    browser.storage.local.get([
        'style',
        'customStyle',
    ], storageCallback);
}

(isFirefox ? browser : chrome).webRequest.addListener(async (details) => {
    if(details.frameId !== 0) return;
    const [, domain, path] = Array.from(details.url.matchAll(/^https?:\/\/(.*\.?.+\.[^/]+)(\/.*)$/g))[0];
    if(domain === "api.minehut.com") {
        if(/\/file\/upload\/[0-9a-f]{24}\/.+/.test(path)) {
            // File upload! Let's see if the file already exists so we can override.
            const [, serverId, filePath] = Array.from(path.matchAll(/\/file\/upload\/([0-9a-f]{24})\/(.+)/))[0];
            await fetch(`https://api.minehut.com/file/${serverId}/delete/${filePath}`, {
                headers: {
                    authorization: details.headers.filter((h) => h.name === "authorization")[0].value,
                    "x-session-id": details.headers.filter((h) => h.name === "x-session-id")[0].value,
                },
                method: "POST",
            });
        }
    }
});
