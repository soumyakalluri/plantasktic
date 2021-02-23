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
    var taskName = $(form).find("#taskName");
    var taskDesc = $(form).find("#taskDescription");
    var dateCompleteBy = $(form).find("#completeBy");

    var task = {
        "taskName": taskName.val(),
        "taskDesc": taskDesc.val(),
        "taskDate": dateCompleteBy.val(),
        "favorite": document.getElementById("favoriteButton").checked
    };

    console.log(task);

    if (taskName.val() == "") {
        console.error("Task name is required. Please enter a task name.");
        alert("Please enter a task name.");
        // Require task name to save <- error catching
    } else {
        // Save to database
        // Add logic to add to JSON file here
        // var myURL = "/";
        // $.get(myURL, callBackFn);
        // Clear fields
        // document.getElementById("addTaskForm").value = "";
        document.getElementById("taskName").value = "";
        document.getElementById("taskDescription").value = "";
        document.getElementById("completeBy").value = "";
        document.getElementById("favoriteButton").checked = false;
        $.post('addedTask', task, function(req, res) {
            console.log("Added task");
            document.location.href = "/";
        });
    }

}

function callBackFn(result) {
    console.log(result);
    var taskHTML = '<div class="task grid-item" onclick="viewTask()">' +
                    '<img id="impcheckbox" class="checkbox" src="/images/checkbox-empty.png">' +
                    '<h3 id="taskname" class="task-name grid-item">' + 'Task Name' + '</h3> </div>';
    $()
}
