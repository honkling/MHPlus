document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get({
        style: 'blue',
    }, function(items) {
        document.getElementById('styles').value = items.style;
    });
});

document.getElementById('save').addEventListener('click', () => {
    const value = document.getElementById('styles').value;
    const status = document.getElementById('status');

    if (!value) {
        status.innerText = "Select a style first!"
        setTimeout(() => {
            status.innerText = ""
        }, 1000);
        return;
    }

    chrome.storage.sync.set({
        style: value
    }, function() {
        status.innerText = `Saved style: ${value}`;
        setTimeout(() => {
            status.innerText = ""
        }, 1000);
    });
});