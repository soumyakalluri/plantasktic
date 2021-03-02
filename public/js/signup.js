'use strict';
var database = [];

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    loadDatabase();
	initializePage();
});

function loadDatabase() {
    $.getJSON('../../database/test.json', function(data) {
        database = data;
        console.log(data);
    });
}

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    console.log("login button initialized");
    $("#signupButton").click(signup);
}

function signup(e) {
    e.preventDefault();

    var userToCheck = document.getElementById("username").value;
    var passwordToCheck = document.getElementById("password").value;

    if (checkForInput(userToCheck, passwordToCheck) == false) {
        return;
    }

	for ( var i=0; i<database.users.length; i++) {
		var user = database.users[i];

        // look for user
		if (user['username'] == userToCheck) {
            console.log("Username already used in database. Username: " + userToCheck);
            $("#signupErrorText").html("<p id=\"signupErrorText\">An account with this username already exists. Please try to login or choose another username.</p>");
            document.getElementsByClassName("signupError")[0].style.display = "inline";
            return;
        }
    }

    document.getElementsByClassName("signupError")[0].style.display = "none";

    // initializing new user to push into database
    var newUser = {
        "username": userToCheck,
        "password": passwordToCheck,
        "coins": 0,
        "imptasks": [],
        "regtasks": [],
        "plants": []
    }

    database.users.push(newUser);
    console.log("Pushed new user into database");
    console.log(database);

    $.ajax({
        type: 'POST',
        url: '/home/' + userToCheck,
        data: database,
        success: function(data, res) {
            console.log("Successfully signed up!");
            document.location.href = "/home/" + userToCheck;
        }
    });

}

function checkForInput(userToCheck, passwordToCheck) {

    if (userToCheck == "" && passwordToCheck == "") {
        $("#signupErrorText").html("<p id=\"signupErrorText\">Please enter a username and password.</p>");
        document.getElementsByClassName("signupError")[0].style.display = "inline";
        return false;
    } else if (passwordToCheck == "") {
        $("#signupErrorText").html("<p id=\"signupErrorText\">Password field is empty. Please enter a password.</p>");
        document.getElementsByClassName("signupError")[0].style.display = "inline";
        return false;
    } else if (userToCheck == "") {
        $("#signupErrorText").html("<p id=\"signupErrorText\">Username field is empty. Please enter a username.</p>");
        document.getElementsByClassName("signupError")[0].style.display = "inline";
        return false;
    }

    return true;
}