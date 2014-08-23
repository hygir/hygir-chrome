// ID to manage the context menu entry
var cmid;
var cm_clickHandler = function(clickData, tab) {
    alert('Selected ' + clickData.selectionText + ' in ' + tab.url);
};

//chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
//    if (msg.request === 'updateContextMenu') {
//        console.log(msg);
//        var type = msg.selection;
//        if (type == '') {
//            // Remove the context menu entry
//            if (cmid != null) {
//                chrome.contextMenus.remove(cmid);
//                cmid = null; // Invalidate entry now to avoid race conditions
//            } // else: No contextmenu ID, so nothing to remove
//        } else { // Add/update context menu entry
//            var suggestions = hygir.makeSuggestions(type);
//            console.log(suggestions);
////            if (suggestions.length < 1) {
////                if (cmid != null) {
////                    chrome.contextMenus.remove(cmid);
////                    cmid = null; // Invalidate entry now to avoid race conditions
////                } // else: No contextmenu ID, so nothing to remove
////            } else {
//                var options = {
//                    title: type,
//                    contexts: ['selection'],
//                    onclick: cm_clickHandler
//                };
//                if (cmid != null) {
//                    chrome.contextMenus.update(cmid, options);
//                } else {
//                    // Create new menu, and remember the ID
//                    cmid = chrome.contextMenus.create(options);
//                }
////            }
//        }
//    }
//});

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.request === 'updateContextMenu') {
        var type = msg.selection;
        console.log('got message - ');
        console.log(msg);
        if (type == '') {
            // Remove the context menu entry
            if (cmid != null) {
                chrome.contextMenus.remove(cmid);
                cmid = null; // Invalidate entry now to avoid race conditions
            } // else: No contextmenu ID, so nothing to remove
        } else { // Add/update context menu entry
            var options = {
                title: type,
                contexts: ['selection'],
                onclick: cm_clickHandler
            };
            if (cmid != null) {
                chrome.contextMenus.update(cmid, options);
            } else {
                // Create new menu, and remember the ID
                cmid = chrome.contextMenus.create(options);
            }
        }
    }
});

