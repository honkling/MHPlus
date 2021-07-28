document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get({
        style: 'default',
    }, function(items) {
        document.getElementById('dashboard-select').value = items.style;
    });
});

document.getElementById('save').addEventListener('click', () => {
    const value = document.getElementById('dashboard-select').value;
    const status = document.getElementById('status');

    if (!value) {
        status.innerText = "Select a style first!"
        setTimeout(() => {
            status.innerText = ""
        }, 2000);
        return;
    }

    chrome.storage.sync.set({
        style: value,
    }, function() {
        status.innerText = "Saved settings.";
        setTimeout(() => {
            status.innerText = ""
        }, 2000);
    });
});