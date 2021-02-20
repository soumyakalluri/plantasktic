'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    $("#save").click(saveTask);
}

function saveTask(e) {
    e.preventDefault();
    var form = $(this).closest(".addTaskForm");
    var textDesc = $(form).find("#taskDescription");
    console.log(textDesc.val());
}
