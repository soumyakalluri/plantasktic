'use strict';
var dataJSON = {};
var username;
var userIdx;

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
    loadDatabase();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    console.log(document.location.href);
    $("#save").click(saveTask);
    $("#cancel").click(cancelTask);
}

function loadDatabase() {
    $.getJSON('../../database/test.json', function(data) {
        dataJSON = data;
        console.log(data);
        username = retrieveUsername();
        userIdx = retrieveUserIndex(username);
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
    } else {
        // Clear fields
        document.getElementById("taskName").value = "";
        document.getElementById("taskDescription").value = "";
        document.getElementById("completeBy").value = "";
        document.getElementById("favoriteButton").checked = false;

        // Save to database
        if ( task['favorite'] == true ) {
            if (dataJSON.users[userIdx]['imptasks'] == null) {
                dataJSON.users[userIdx]['imptasks'] = [];
            }
            (dataJSON.users[userIdx]['imptasks']).push(task);
            console.log(dataJSON.users[userIdx]['imptasks']);
        } else {
            if (dataJSON.users[userIdx]['regtasks'] == null) {
                dataJSON.users[userIdx]['regtasks'] = [];
            }
            (dataJSON.users[userIdx]['regtasks']).push(task);
            console.log(dataJSON.users[userIdx]['regtasks']);
        }

        console.log(dataJSON.users[userIdx]['regtasks']);
        $.ajax({
            type: 'POST',
            url: '/home/' + username,
            data: dataJSON,
            success: function(data, res) {
                setTimeout(function() {
                    document.location.href = "/home/" + username;
                }, 75);
            }
        });
    }

}

function cancelTask(e) {
    e.preventDefault();
    document.location.href = "/home/" + username;
}

function retrieveUsername() {
    var URL = document.location.href;
    var URLcomponents = URL.split('/');
    console.log("Retrieved user: " + URLcomponents[URLcomponents.length-1]);
    return URLcomponents[URLcomponents.length-1];
}

function retrieveUserIndex(username) {
    var index = 0;
    for (var i = 0; i < dataJSON.users.length; i++) {
        var userIdx = dataJSON.users[i];
        if (userIdx['username'] == username) {
            index = i;
            break;
        }
    }
    return index;
}