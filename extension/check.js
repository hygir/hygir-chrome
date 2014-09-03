var applySpellCheck = function(text) {
    // Returns text with span tags
    var words = text.match(/[ա-ֆ]+/gi);
    for( var index in words) {
        console.log(words[index]);
        text = text.replace(/\bwords[index]\b/i, '<span class="hySpellingError">' + words[index] + '</span');
    }
    return text
}

var highlight_errors = function(textarea) {
    var bad_words = [];
    var words = textarea.value.split(' ');
    for (var i=0; i<words.length; i++) {
        word = words[i];
        if (hygir.isInLanguage(word) && !hygir.isKnown(word)) {
            bad_words.push(word);
        }
    }

    console.log(textarea);
    console.log($(textarea));
    console.log('bad_words:');
    console.log(bad_words);
    $(textarea).highlightTextarea({
        words: bad_words.slice()
    });
}


// Add listeners
var textareas = document.getElementsByTagName("textarea");

for (var i=0, len=textareas.length; i<len; i++) {
    var textarea = textareas[i];
    textarea.onkeyup = function (evt) {
        highlight_errors(this);
    };
}
