'use strict';
var dataJSON = {};

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
    loadDatabase();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    $("#save").click(saveTask);
}

function loadDatabase() {
    $.getJSON('../../database/test.json', function(data) {
        dataJSON = data;
        console.log(data);
    });
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

        if ( task['favorite'] == true ) {
            (dataJSON.users[0]['imptasks']).push(task);
            console.log(dataJSON.users[0]['imptasks']);
        } else {
            (dataJSON.users[0]['regtasks']).push(task);
            console.log(dataJSON.users[0]['regtasks']);
        }

        console.log(dataJSON.users[0]['regtasks']);
        $.ajax({
            type: 'POST',
            url: '/addedTask',
            data: dataJSON,
            success: function(data, res) {
                console.log("Updated JSON: ");
                console.log(dataJSON);
                // document.location.href = "/";
            }
        });
        alert("Task saved! Hit cancel to go to home page!");
    }

}

