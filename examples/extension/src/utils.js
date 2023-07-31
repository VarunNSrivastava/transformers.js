import SentenceTokenizer from './natural/sentence_tokenizer_parser.js';

/*
external:
- splitText
internal:
- all helpers
 */
export function prettyLog(label, message, labelColor = 'blue', messageColor = 'black') {
    console.log("%c" + label + ": %c" + message,
        "font-weight: bold; color: " + labelColor + ";",
        "font-weight: normal; color: " + messageColor + ";");
}


let tokenizer = new SentenceTokenizer(); // Create a new SentenceTokenizer

// export function collectTextNodes(element) {
//     return tokenizer.tokenize(element.textContent);
// }

export function collectTextNodes(element, texts = []) {
    if (element.nodeType === Node.ELEMENT_NODE && element.tagName.toLowerCase() === 'p') {
        let sentences = tokenizer.tokenize(element.textContent); // Tokenize the text content into sentences
        for (let sentence of sentences) {
            sentence = sentence.trim();  // Remove leading/trailing white spaces
            if (sentence !== "") {
                texts.push(sentence);
            }
        }
    } else {
        for (let child of element.childNodes) {
            collectTextNodes(child, texts);
        }
    }
    return texts;
}


