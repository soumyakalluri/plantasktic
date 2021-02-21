'use strict'
var database = [];
$.getJSON('../database/database.json', function(data) {
    database = data.users;
    var dataLength = data.length;
    for ( var i = 0; i < dataLength; i++ ) {
        var obj = data.users[i];
        database.push(obj);
    }
});

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    console.log("login button initialized");
    $("#loginButton").click(login);
}

function login(e) {
    e.preventDefault();
    var userToCheck = document.getElementById("username").value;
    var passwordToCheck = document.getElementById("password").value;

    console.log(database);
	console.log("Finding user..." + userToCheck);
	for ( var i=0; i<database.length; i++) {
		var user = database[i];

        // look for user
		if (user['username'] == userToCheck) {
			console.log("Found user: " + userToCheck);

            //check password
            if (user['password'] == passwordToCheck) {
                console.log("Found password: " + passwordToCheck);
                var projectURL = "/" + userToCheck + "/";
                $.get(projectURL, callback);
            } else {
                console.log("incorrect password");
            }
		} else {
            console.log("could not find user");
        }
	}
}

// /*
//  * Make an AJAX call to retrieve project details and add it in
//  */
// function addProjectDetails(e) {
// 	// Prevent following the link
// 	e.preventDefault();

// 	// Get the div ID, e.g., "project3"
// 	var projectID = $(this).closest('.project').attr('id');
// 	// get rid of 'project' from the front of the id 'project3'
// 	var idNumber = projectID.substr('project'.length);

// 	console.log("User clicked on project " + idNumber);

// 	var projectURL = "/" + idNumber;
// 	$.get(projectURL, callback);
// }

function callback(result) {
	// Prevent following the link
	// console.log(result);
	var loginHTML = '';

	// $("#project" + result['id'] + " .details").html(loginHTML);
}