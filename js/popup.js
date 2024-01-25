const isFirefox = typeof InstallTrigger !== "undefined";
const defaultStyle = {
    backgroundColor: "#121212",
    foregroundColor: "#1e1e1e",
    primaryColor: "#2196f3",
    selectColor: "#666666",
    textColor: "#ffffff",
    dangerColor: "#ff5555",
};
const regex = /(?!i)#[0-9a-f]{3,8}/;

function handleError(e) {
    console.error(e);
    updateStatus("An error occurred.", false);
}

function updateStatus(message, success) {
    const status = document.querySelector(".status");
    status.textContent = (success ? "✔️ " : "❌ ") + message;
    status.id = success ? "success" : "error";
}

let localStorage;

chrome.tabs.query({ url: "https://app.minehut.com/*" })
    .then((result) => {
        const status = document.querySelector(".status");

        if (result.length < 1) {
            updateStatus("Couldn't find tab.", false);
            return;
        }

        const tab = result[0];

        chrome.scripting.executeScript(
            {
                target: { tabId: tab.id },
                files: ["js/auth.js"],
            },
            (res) => {
                localStorage = JSON.parse(res[0].result);
                updateStatus("Fetched authentication information", true);
            }
        );
    })
    .catch(handleError);

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#copy").addEventListener("click", () => {
        const format = document.querySelector("#format");
        switch (format.value) {
            case "json":
                navigator.clipboard.writeText(JSON.stringify(localStorage));
                break;
            case "human":
                navigator.clipboard.writeText(`
Minehut Token: ${localStorage.minehutToken}
Minehut Session ID: ${localStorage.minehutSession}
SLG Profile ID: ${localStorage.slgProfile}
SLG Session ID: ${localStorage.slgSession}
SLG User Token: ${localStorage.slgUserToken}
                `.trim());
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    function storageCallback(items) {
        function setValueById(id, value) {
            document.getElementById(id).value = value;
        }

        function property(key) {
            return regex.test(items.customStyle[key]) ? items.customStyle[key] : defaultStyle[key];
        }

        document.getElementById("dashboard-select").value = items.style;

        setValueById("custom-bg-color", property("backgroundColor"));
        setValueById("custom-fg-color", property("foregroundColor"));
        setValueById("custom-primary-color", property("primaryColor"));
        setValueById("custom-select-color", property("selectColor"));
        setValueById("custom-text-color", property("textColor"));
        setValueById("custom-danger-color", property("dangerColor"));
        const fieldList = document.getElementsByClassName("custom-theme-fields");
        for(let i = 0; i < fieldList.length; i++) {
            const fields = fieldList.item(i);
            if(items.style !== "custom")
                fields.style.display = "none";
            else {
                fields.style.display = "flex";
            }
        }
    }

    chrome.storage.sync.get({
        style: "default",
        customStyle: {
            backgroundColor: "#121212",
            foregroundColor: "#1e1e1e",
            primaryColor: "#2196f3",
            selectColor: "#666666",
            textColor: "#ffffff",
            dangerColor: "#ff5555",
        },
    }, storageCallback);
});

document.getElementById("save").addEventListener("click", () => {
    function getValueById(key, id) {
        const value = document.getElementById(id).value;
        return regex.test(value) ? value : defaultStyle[key];
    }

    const value = document.getElementById("dashboard-select").value;
    const status = document.getElementById("status");

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

    chrome.storage.sync.set({
        style: value,
        ...customStyle,
    }, storageCallback);
});
