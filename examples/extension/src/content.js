// content.js - the content scripts which is run in the context of web pages, and has access
// to the DOM and other web APIs.


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type === "getText") {
        sendResponse({text: document.body.innerText});
    }
});
