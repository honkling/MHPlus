const isFirefox = typeof InstallTrigger !== 'undefined';

document.addEventListener('DOMContentLoaded', () => {
    if(!isFirefox) {
        chrome.storage.sync.get({
            style: 'default',
        }, (items) => {
            document.getElementById('dashboard-select').value = items.style;
        });
    } else {
        browser.storage.local.get({
            style: 'default',
        }, (items) => {
            document.getElementById('dashboard-select').value = items.style;
        })
    }
});

document.getElementById('save').addEventListener('click', () => {
    const value = document.getElementById('dashboard-select').value;
    const status = document.getElementById('status');

    if (!value) {
        status.innerText = "Select a style first!"
        setTimeout(() => status.innerText = "", 2000);
        return;
    }

    if(!isFirefox) {
        chrome.storage.sync.set({
            style: value,
        }, () => {
            status.innerText = "Saved settings.";
            setTimeout(() => status.innerText = "", 2000);
        });
    } else {
        browser.storage.local.set({
            style: value,
        }, () => {
            status.innerText = "Saved settings.";
            setTimeout(() => status.innerText = "", 2000);
        })
    }
});