const isFirefox = typeof InstallTrigger !== 'undefined';
const defaultStyle = {
    backgroundColor: "#121212",
    foregroundColor: "#1e1e1e",
    primaryColor: "#2196f3",
    selectColor: "#666666",
    textColor: "#ffffff",
    dangerColor: "#ff5555",
};
const regex = /(?!i)#[0-9a-f]{3,8}/;

document.addEventListener('DOMContentLoaded', () => {
    function storageCallback(items) {
        function setValueById(id, value) {
            document.getElementById(id).value = value;
        }

        function property(key) {
            return regex.test(items.customStyle[key]) ? items.customStyle[key] : defaultStyle[key];
        }

        document.getElementById('dashboard-select').value = items.style;

        setValueById("custom-bg-color", property("backgroundColor"));
        setValueById("custom-fg-color", property("foregroundColor"));
        setValueById("custom-primary-color", property("primaryColor"));
        setValueById("custom-select-color", property("selectColor"));
        setValueById("custom-text-color", property("textColor"));
        setValueById("custom-danger-color", property("dangerColor"));
        const fieldList = document.getElementsByClassName("custom-theme-fields");
        //alert(`${computedStyle.display}`);
        for(let i = 0; i < fieldList.length; i++) {
            const fields = fieldList.item(i);
            if(items.style !== "custom")
                fields.style.display = "none";
            else {
                fields.style.display = "flex";
            }
        }
    }

    if(!isFirefox) {
        chrome.storage.sync.get({
            style: 'default',
            customStyle: {
                backgroundColor: "#121212",
                foregroundColor: "#1e1e1e",
                primaryColor: "#2196f3",
                selectColor: "#666666",
                textColor: "#ffffff",
                dangerColor: "#ff5555",
            },
        }, storageCallback);
    } else {
        browser.storage.local.get({
            style: 'default',
            customStyle: {
                backgroundColor: "#121212",
                foregroundColor: "#1e1e1e",
                primaryColor: "#2196f3",
                selectColor: "#666666",
                textColor: "#ffffff",
                dangerColor: "#ff5555",
            },
        }, storageCallback);
    }
});

document.getElementById('save').addEventListener('click', () => {
    function getValueById(key, id) {
        const value = document.getElementById(id).value;
        return regex.test(value) ? value : defaultStyle[key];
    }

    const value = document.getElementById("dashboard-select").value;
    const status = document.getElementById('status');

    if (!value) {
        status.innerText = "Select a style first!"
        setTimeout(() => status.innerText = "", 2000);
        return;
    }

    function storageCallback() {
        status.innerText = "Saved settings.";
        setTimeout(() => status.innerText = "", 2000);

        const fieldList = document.getElementsByClassName("custom-theme-fields");
        for(let i = 0; i < fieldList.length; i++) {
            const fields = fieldList.item(i);
            if(value !== "custom")
                fields.style.display = "none";
            else {
                fields.style.display = "flex";
            }
        }
    }

    const customStyle = value !== "custom" ? {} : {
        customStyle: {
            backgroundColor: getValueById("backgroundColor", "custom-bg-color"),
            foregroundColor: getValueById("foregroundColor", "custom-fg-color"),
            primaryColor: getValueById("primaryColor", "custom-primary-color"),
            selectColor: getValueById("selectColor", "custom-select-color"),
            textColor: getValueById("textColor", "custom-text-color"),
            dangerColor: getValueById("dangerColor", "custom-danger-color"),
        },
    };

    if(!isFirefox) {
        chrome.storage.sync.set({
            style: value,
            ...customStyle,
        }, storageCallback);
    } else {
        browser.storage.local.set({
            style: value,
            ...customStyle,
        }, storageCallback)
    }
});