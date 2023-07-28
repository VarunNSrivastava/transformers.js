// content.js
import { prettyLog } from './utils.js';

chrome.runtime.onMessage.addListener((request, sender) => {
    // prettyLog("popup sent message to content", document.body.innerText);
    if (request.type === "getText") {
        chrome.runtime.sendMessage({type: "responseText", text: document.body.innerText});
    }
});

