// background.js - Handles requests from the UI, runs the model, then sends back a response

import { CustomCache } from "./cache.js";
import { splitText, prettyLog } from './utils.js';
import {similarity} from './semantic.js';


////////////////////// 1. Context Menus //////////////////////
//
// Add a listener to create the initial context menu items,
// context menu items only need to be created at runtime.onInstalled
chrome.runtime.onInstalled.addListener(function () {
    // Register a context menu item that will only show up for selection text.
    chrome.contextMenus.create({
        id: 'classify-selection',
        title: 'Classify "%s"',
        contexts: ['selection'],
    });
});

// Perform inference when the user clicks a context menu
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    // Ignore context menu clicks that are not for classifications (or when there is no input)
    if (info.menuItemId !== 'classify-selection' || !info.selectionText) return;

    // Perform classification on the selected text
    // let result = await classify(info.selectionText);

    // Do something with the result
    // chrome.scripting.executeScript(

    //     {
    //     target: { tabId: tab.id },    // Run in the tab that the user clicked in
    //     args: [result],               // The arguments to pass to the function
    //     function: (result) => {       // The function to run
    //         // NOTE: This function is run in the context of the web page, meaning that `document` is available.
    //         console.log('result', result)
    //         console.log('document', document)
    //     },
    // }
    // );
});
//////////////////////////////////////////////////////////////

////////////////////// 2. Message Events /////////////////////
//
// Listen for messages from the UI, process it, and send the result back.

let bodyText = "";
let inputText = "";

let liveProcess = 0;

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
    if (request.type === "bodyText") {
        bodyText = request.text;
    } else if (request.type === "inputText") {
        prettyLog("received query", request.text, "grey");
        inputText = request.text;
    } else if (request.type === "killProcess") {
        // prettyLog("requested to kill", request.processId, "blue");
        // delete runningProcesses[request.processId];
    } else {
        // prettyLog(request.type, "misc request type");
        return;
    }
    if (!bodyText || !inputText) { return; }

    liveProcess++;
    prettyLog("process beginning", liveProcess, "purple");
    const processId = liveProcess;
    // runningProcesses[processId] = true;
    // sendResponse({processId});

    await processQuery(inputText, bodyText, processId);

    // delete runningProcesses[processId];
});


async function processQuery(query, bodyText, processId) {
    let results = [];
    const k = 10;

    for (let text of await splitText(bodyText)) {
        if (processId !== liveProcess) {
            prettyLog("terminated", processId, "red");
            return;
        } // process killed

        let sim = await similarity(query, text);

        if (sim > 0.25) {
            results.push({sim: sim, text: text});
            results.sort((a, b) => b.sim - a.sim);
            results.length = Math.min(results.length, k);

            // Send the results up to the cutoff point
            chrome.runtime.sendMessage({type: "results", text: results.map(result => result.text)});
        }
    }
    prettyLog("completed", processId, "red");
}

async function processQuery2(query, bodyText, processId) {
    // std deviation based cutoff measure

    let results = [];
    let sum = 0;
    let sumOfSquares = 0;
    let count = 0;
    let cutoff = -1;

    for (let text of await splitText(bodyText)) {
        if (!runningProcesses[processId]) { return; } // process killed

        let sim = await similarity(query, text);

        sum += sim;
        sumOfSquares += sim * sim;
        count += 1;

        let mean = sum / count;
        let variance = sumOfSquares / count - mean * mean;
        let stdDev = Math.sqrt(variance);

        if (sim > mean + (2 * stdDev)) {
            results.push({sim: sim, text: text});
            results.sort((a, b) => b.sim - a.sim);

            // Adjust the cutoff point if necessary
            if (cutoff !== -1 && results[cutoff].sim <= mean + (2 * stdDev)) {
                cutoff--;
            } else if (cutoff + 1 < results.length && results[cutoff + 1].sim > mean + stdDev) {
                cutoff++;
            }

            // Send the results up to the cutoff point
            chrome.runtime.sendMessage({type: "results", text: results.slice(0, cutoff + 1).map(result => result.text)});
        }
    }
}

//////////////////////////////////////////////////////////////

