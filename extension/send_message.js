document.addEventListener('selectionchange', function() {
    var selection = window.getSelection().toString().trim();
    if (selection === '' || selection.indexOf(' ') !== -1) {
        var correction = '';
    } else {
        var suggestions = hygir.makeSuggestions(selection);
        console.log('suggestions');
        console.log(suggestions);
        if (suggestions.length > 0) {
            console.log('got suggestion - ' + suggestions[0]);
            var correction = suggestions[0];
            if ( correction == null || correction == undefined) {
                correction = '';
            }
        } else {
            var correction = '';
        }
        selection = correction.toString().trim();
    };
    chrome.extension.sendMessage({
        request: 'updateContextMenu',
        selection: selection,
        correction: correction
    });
    console.log(correction);
});
