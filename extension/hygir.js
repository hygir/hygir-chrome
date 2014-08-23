var HygirSpellChecker = function () {
    this.DICTIONARY = {};

    this.setDictionary = function(newDictionary) {
        this.DICTIONARY = newDictionary;
    };

    this.setAlphabet = function(newAlphabet) {
        this.ALPHABET = newAlphabet
    };

    this.isKnown = function(word) {
        return this.DICTIONARY.hasOwnProperty(word);
    };

    this.edits1 = function(word) {
        var edits1Set = [];
        for (var i = 0; i < word.length; i++) {
            var beginning = word.slice(0,i);
            var rest = word.slice(i);
            var end = word.slice(i+1);
            // Deletions at position i
            edits1Set.push(beginning + end);
            // Transposes
            if (rest.length > 0) {
                edits1Set.push(beginning + rest.charAt(1) + rest.charAt(2) + end.slice(1));
            }
            for (var j = 0; j < this.ALPHABET.length; j++) {
                // Replacements
                edits1Set.push(beginning + this.ALPHABET[i] + end);
                // Inserts
                edits1Set.push(beginning + this.ALPHABET[i] + rest);
            }
        }
        //Inserts in the end of the word.
        for (var j = 0; j < this.ALPHABET.length; j++) {
            edits1Set.push(word + this.ALPHABET[j])
        }
        edits1Set.push(word);
        return edits1Set;
    };

    this.knownEdits2Weighted = function(word) {
        knownEdits2 = {};
        edit1words = this.edits1(word);
        console.log(edit1words);
        for (var i = 0; i < edit1words.length; i++) {
            edits2 = this.edits1(edit1words[i]);    
            for (var j = 0; j < edits2.length; j++) {
                if (this.isKnown(edits2[j])) {
                    console.log('zzz   ' + edits2[j]);
                }
                if ( this.isKnown(edits2[j]) && ! knownEdits2.hasOwnProperty(edits2[j])) {
                    knownEdits2[edits2[j]] = this.DICTIONARY[edits2[j]];
                }
            }
        }
        return knownEdits2;
    };

    this.argMax = function(dictionary) { 
        var max_arg = null, max_value = -10000000000;
        for ( key in dictionary ) {
            console.log(key);
            if (dictionary.hasOwnProperty(key) && dictionary[key] > max_value) {
                max_arg = key;
                max_value = dictionary[key]; }
        }
        return max_arg;
    }

    this.isInLanguage = function(word) {
        for ( indx in this.ALPHABET) {
            letter = this.ALPHABET[indx];
            if ( word.indexOf(letter) !== -1) {
                return true;
            }
        }
        return false;
    };

    this.makeSuggestions = function(word) {
        if ( this.isInLanguage(word) === false ) {
            console.log('not in language');
            return [];
        } else if ( this.isKnown(word) === true ) {
            console.log('is known word');
            return [];
        } else {
            possibilities = this.knownEdits2Weighted(word);
            console.log(possibilities.length);
            suggestions = [];
            suggestions.push(this.argMax(possibilities));
            return suggestions
        }
    };
}

hygir = new HygirSpellChecker()

hygir.setAlphabet([
    String.fromCharCode(0x0531),
    String.fromCharCode(0x0532),
    String.fromCharCode(0x0533),
    String.fromCharCode(0x0534),
    String.fromCharCode(0x0535),
    String.fromCharCode(0x0536),
    String.fromCharCode(0x0537),
    String.fromCharCode(0x0538),
    String.fromCharCode(0x0539),
    String.fromCharCode(0x053a),
    String.fromCharCode(0x053b),
    String.fromCharCode(0x053c),
    String.fromCharCode(0x053d),
    String.fromCharCode(0x053e),
    String.fromCharCode(0x053f),
    String.fromCharCode(0x0540),
    String.fromCharCode(0x0541),
    String.fromCharCode(0x0542),
    String.fromCharCode(0x0543),
    String.fromCharCode(0x0544),
    String.fromCharCode(0x0545),
    String.fromCharCode(0x0546),
    String.fromCharCode(0x0547),
    String.fromCharCode(0x0548),
    String.fromCharCode(0x0549),
    String.fromCharCode(0x054a),
    String.fromCharCode(0x054b),
    String.fromCharCode(0x054c),
    String.fromCharCode(0x054d),
    String.fromCharCode(0x054e),
    String.fromCharCode(0x054f),
    String.fromCharCode(0x0550),
    String.fromCharCode(0x0551),
    String.fromCharCode(0x0552),
    String.fromCharCode(0x0553),
    String.fromCharCode(0x0554),
    String.fromCharCode(0x0555),
    String.fromCharCode(0x0556),
    String.fromCharCode(0x0561),
    String.fromCharCode(0x0562),
    String.fromCharCode(0x0563),
    String.fromCharCode(0x0564),
    String.fromCharCode(0x0565),
    String.fromCharCode(0x0566),
    String.fromCharCode(0x0567),
    String.fromCharCode(0x0568),
    String.fromCharCode(0x0569),
    String.fromCharCode(0x056a),
    String.fromCharCode(0x056b),
    String.fromCharCode(0x056c),
    String.fromCharCode(0x056d),
    String.fromCharCode(0x056e),
    String.fromCharCode(0x056f),
    String.fromCharCode(0x0570),
    String.fromCharCode(0x0571),
    String.fromCharCode(0x0572),
    String.fromCharCode(0x0573),
    String.fromCharCode(0x0574),
    String.fromCharCode(0x0575),
    String.fromCharCode(0x0576),
    String.fromCharCode(0x0577),
    String.fromCharCode(0x0578),
    String.fromCharCode(0x0579),
    String.fromCharCode(0x057a),
    String.fromCharCode(0x057b),
    String.fromCharCode(0x057c),
    String.fromCharCode(0x057d),
    String.fromCharCode(0x057e),
    String.fromCharCode(0x057f),
    String.fromCharCode(0x0580),
    String.fromCharCode(0x0581),
    String.fromCharCode(0x0582),
    String.fromCharCode(0x0583),
    String.fromCharCode(0x0584),
    String.fromCharCode(0x0585),
    String.fromCharCode(0x0586),
    String.fromCharCode(0x0587)])
