var correct = function (info,tab) {
    console.log("Word " + info.selectionText + " was clicked.");
    chrome.tabs.create({ 
        url: "http://www.google.com/search?q=" + info.selectionText,
    })
};

var myContextMenuItemId = "hygir.conxtextmenu.correction.1";

chrome.contextMenus.create({
    id: myContextMenuItemId,
    title: "Correct: %s", 
    contexts: ["selection"], 
    onclick: correct,
});
