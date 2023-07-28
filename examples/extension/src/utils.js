
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

export async function splitText(text, splitType = "Words", splitParam= 8) {
    let chunks;
    switch(splitType) {
        case 'Regex':
            chunks = splitByRegex(text, splitParam);
            break;
        case 'Sentence':
            chunks = splitBySentences(text);
            break;
        case 'Words':
            chunks = splitByWords(text, parseInt(splitParam));
            break;
        case 'Chars':
            chunks = splitByChars(text, parseInt(splitParam));
            break;
        default:
            console.error('Invalid split type');
            return null;
    }
    return chunks.filter(chunk => chunk.trim().length > 0);
}


function splitByWords(text, numWords) {
    if (isNaN(numWords) || !Number.isInteger(numWords)) {
        console.error("numWords must be an integer.");
        return null;
    }

    let chunks = [];
    let lines = text.split("\n");

    for (let line of lines) {
        const words = line.split(" ");
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
    }

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

    let chunks = text.split(regexPeriod)
        .join(split_here)
        .split(regexSemicolon)
        .join(split_here)
        .split(regexQuestionMark)
        .join(split_here)
        .split(regexExclamationMark)
        .join(split_here)
        .split(split_here);
    return chunks;
}



function splitByRegex(text, r) {
    let regex = new RegExp(r, 'g');
    return text.split(regex);
}


