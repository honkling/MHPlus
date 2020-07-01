function saveSettings() {
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
}

function handleOnLoad() {
    const select = document.getElementById('styles');
    ['purple', 'blue'].forEach(v => {
        const e = document.createElement('option');
        e.value = v;
        e.innerText = v;
        select.appendChild(e);
    });
}