document.getElementById('mode-select').addEventListener('change', saveOptions);

function saveOptions(e) {
    const mode = e.target.value;
    browserObject.storage.local.set({ mode }, () => {
        browserObject.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            browserObject.tabs.sendMessage(tabs[0].id, { action: "updateSettings", mode: mode });
        });
    });
}


function getBrowser() {
    if (typeof chrome !== 'undefined') {
        return chrome;
    } else if (typeof browser !== 'undefined') {
        return browser;
    } else {
        console.error('This script is not running in a supported browser.');
        return null;
    }
}
const browserObject = getBrowser();

if (browserObject) {
    document.getElementById('options-form').addEventListener('submit', saveOptions);

    function saveOptions(e) {
        e.preventDefault();
        const mode = document.getElementById('mode-select').value;
        browserObject.storage.local.set({ mode }, () => {
            window.close();  // Close the popup after saving
        });
    }

    function restoreOptions() {
        browserObject.storage.local.get('mode', (result) => {
            document.getElementById('mode-select').value = result.mode || 'gpt-4';
        });
    }

    document.addEventListener('DOMContentLoaded', restoreOptions);
} else {
    console.error('Unable to initialize extension: unsupported browser.');
}