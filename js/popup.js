document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get({
        style: 'default',
        forums: 'default'
    }, function(items) {
        document.getElementById('dashboard-select').value = items.style;
        document.getElementById('forums-select').value = items.forums;
    });
});

document.getElementById('save').addEventListener('click', () => {
    const value = document.getElementById('dashboard-select').value;
    const forumsTheme = document.getElementById('forums-select').value;
    const status = document.getElementById('status');

    if (!value || !forumsTheme) {
        status.innerText = "Select a style first!"
        setTimeout(() => {
            status.innerText = ""
        }, 2000);
        return;
    }

    chrome.storage.sync.set({
        style: value,
        forums: forumsTheme
    }, function() {
        status.innerText = "Saved settings.";
        setTimeout(() => {
            status.innerText = ""
        }, 2000);
    });
});