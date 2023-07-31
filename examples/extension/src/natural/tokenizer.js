// tokenizer.js
class Tokenizer {
    trim(array) {
        while (array[array.length - 1] === '') { array.pop(); }
        while (array[0] === '') { array.shift(); }
        return array;
    }

    tokenize() { /* This method should be overridden in subclasses */ }
}

export default Tokenizer;
