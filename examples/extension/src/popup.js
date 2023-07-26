// popup.js - handles interaction with the extension's popup, sends requests to the
// service worker (background.js), and updates the popup's UI (popup.html) on completion.

const inputElement = document.getElementById('text');
const outputElement = document.getElementById('output');
const progressBar = document.getElementById('progress');

// debounced listener (waits 100ms after last change to input)
let debounceTimeout;
inputElement.addEventListener('input', (event) => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        chrome.runtime.sendMessage({type: "inputText", text: inputElement.value});
    }, 100);
});


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    switch (request.type) {
        case "mostSimilarText":
            outputElement.textContent = request.text; // Set the output text
            break;
        case "download":
            console.log("got a download message");
            if (request.data.status === 'progress') {
                let progress = request.data.progress.toFixed(2);
                progressBar.value = progress; // Update the progress bar
            } else if (request.data.status === 'done') {
                progressBar.value = 100; // Set the progress bar to 100%
            }
            break;
    }
});

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {type: "getText"}, function(response) {
        chrome.runtime.sendMessage({type: "bodyText", text: response.text});
    });
});
