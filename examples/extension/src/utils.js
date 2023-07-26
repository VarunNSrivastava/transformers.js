
/*
external:
- splitText
internal:
- all helpers
 */


export async function splitText(text, splitType = "Sentence", splitParam= null) {
    switch(splitType) {
        case 'Regex':
            return splitByRegex(text, splitParam);
        case 'Sentence':
            return splitBySentences(text);
        case 'Words':
            return splitByWords(text, parseInt(splitParam));
        case 'Chars':
            return splitByChars(text, parseInt(splitParam));
        default:
            console.error('Invalid split type');
            return null;
    }
}

// lets do a fe

function splitByWords(text, numWords) {
    if (isNaN(numWords) || !Number.isInteger(numWords)) {
        console.error("numWords must be an integer.");
        return null;
    }

    const words = text.split(" ");
    let chunks = [];
    let currentChunk = [];

    for (let i = 0; i < words.length; i++) {
        currentChunk.push(words[i]);

        if (currentChunk.length === numWords) {
            chunks.push(currentChunk.join(' '));
            currentChunk = [];
        }
    }

    if (currentChunk.length > 0) {
        chunks.push(currentChunk.join(' '));
    }
    chunks = chunks.filter(chunk => chunk.trim().length > 0);


    return chunks;
}


function splitByChars(text, numChars) {
    const words = text.split(' ');
    const chunks = [];

    for (let i = 0; i < words.length; i++) {
        const word = words[i];

        if (chunks.length === 0 || chunks[chunks.length - 1].length + word.length + 1 > numChars) {
            chunks.push(word);
        } else {
            chunks[chunks.length - 1] += ' ' + word;
        }
    }

    return chunks;
}


function createRegex(character) {
    // This regular expression matches a character that is followed by a white space or a quote.
    let regex = new RegExp(`(?<=${character})(?=\\s|")`, 'g');
    return regex;
}

function splitBySentences(text) {
    // This function splits the text at a period, semicolon, question mark, or exclamation mark
    // that is followed by a white space or a quote.
    let regexPeriod = createRegex('\\.');
    let regexSemicolon = createRegex(';');
    let regexQuestionMark = createRegex('\\?');
    let regexExclamationMark = createRegex('!');
    let split_here = "a3Zb5Y6K9q";

    let sentences = text.split(regexPeriod)
        .join(split_here)
        .split(regexSemicolon)
        .join(split_here)
        .split(regexQuestionMark)
        .join(split_here)
        .split(regexExclamationMark)
        .join(split_here)
        .split(split_here);
    return sentences;
}



function splitByRegex(text, r) {
    let regex = new RegExp(r, 'g');
    return text.split(regex);
}


