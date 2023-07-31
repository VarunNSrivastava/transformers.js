class SentenceTokenizer {
    trim(array) {
        while (array[array.length - 1] === '') { array.pop(); }
        while (array[0] === '') { array.shift(); }
        return array;
    }

    tokenize(text) {
        let tokens = text.match(/(?<=\s+|^)["'‘“'"[({⟨]?(.*?[.?!…]|[^.?!…]+)(\s[.?!…])*["'’”'"\])}⟩]?(?=\s+|$)/g);

        if (!tokens) {
            return [text];
        }

        // remove unnecessary white space
        tokens = tokens.map(token => token.trim());

        return this.trim(tokens);
    }
}

export default SentenceTokenizer;
