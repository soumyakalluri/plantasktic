'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    $("#impcheckbox").click(deleteTask);
    $("#regcheckbox").click(deleteTask);
}

function viewTask(e) {
    // e.preventDefault();
    // console.log("view " + e.taskName);
}

function deleteTask(e) {
    e.preventDefault();
    var task = $(this).closest(".task");
    var taskname = $(task).find("#taskname").text();
    console.log("delete task " + taskname);
}