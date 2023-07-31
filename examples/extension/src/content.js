// content.js
import { prettyLog, collectTextNodes} from './utils.js';

chrome.runtime.onMessage.addListener((request, sender) => {
    if (request.type === "getText") {
        let text = document.body.textContent;
        prettyLog("body", text);
        chrome.runtime.sendMessage({type: "tabUpdated", text: collectTextNodes(document.body)});
    }
});
