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
    // Assumes there is a div with 'under-%s' id
    var styleCss = document.defaultView.getComputedStyle(textarea, "").cssText;
    var underDiv = document.getElementById('under-' + textarea.id);
    underDiv.style.cssText = styleCss;
    underDiv.className = " overlayTextarea";
    underDiv.style.zIndex = '-1';
    underDiv.innerHTML = applySpellCheck(textarea.value);
}

var textareas = document.getElementsByTagName("textarea");

for (var i=0, len=textareas.length; i<len; i++) {
    var textarea = textareas[i];
    var originalStyle = document.defaultView.getComputedStyle(textarea, "").cssText
    var outerDiv = document.createElement("div");
    outerDiv.style.position = "relative";
    outerDiv.id = 'outer-' + textarea.id;
    var _parent = textarea.parentElement;
    _parent.removeChild(textarea);
    _parent.appendChild(outerDiv);
    textarea.className += " realTextarea";
    outerDiv.appendChild(textarea);
    underDiv = document.createElement("div");
    underDiv.style.cssText = originalStyle;
    underDiv.id = 'under-' + textarea.id;
    underDiv.className = " overlayTextarea";
    outerDiv.appendChild(underDiv);

    textareas[i].onkeyup = function (evt) {
        
        highlight_errors(textarea);
    }  
}

