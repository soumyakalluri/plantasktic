'use strict';
var database = [];
$.getJSON('../database/test.json', function(data) {
    database = data.users;
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

    if (checkForInput(userToCheck, passwordToCheck) == false) {
        return;
    }

    // console.log(database);
	console.log("Finding user..." + userToCheck);
	for ( var i=0; i<database.length; i++) {
		var user = database[i];

        // look for user
		if (user['username'] == userToCheck) {
			console.log("Found user: " + userToCheck);

            //check password
            if (user['password'] == passwordToCheck) {
                console.log("Found password: " + passwordToCheck);
                document.getElementsByClassName("loginError")[0].style.display = "none";

                $.ajax({
                    type: 'GET',
                    url: '/home/' + userToCheck,
                    success: function(data, res) {
                        console.log("Successfully logged in!");
                        setTimeout(function() {
                            document.location.href = "/home/" + userToCheck;
                        }, 75);
                    }
                });
                return;
            } else {
                console.log("incorrect password");
                $("#loginErrorText").html("<p id=\"loginErrorText\">Password is incorrect. Please try again.</p>");
                document.getElementsByClassName("loginError")[0].style.display = "inline";
                return;
            }
		}
	}

    console.log("could not find user");
    $("#loginErrorText").html("<p id=\"loginErrorText\">Could not find account. Please sign up.</p>");
    document.getElementsByClassName("loginError")[0].style.display = "inline";
}

function checkForInput(userToCheck, passwordToCheck) {

    if (userToCheck == "" && passwordToCheck == "") {
        $("#loginErrorText").html("<p id=\"loginErrorText\">Please enter a username and password.</p>");
        document.getElementsByClassName("loginError")[0].style.display = "inline";
        return false;
    } else if (passwordToCheck == "") {
        $("#loginErrorText").html("<p id=\"loginErrorText\">Password field is empty. Please enter a password.</p>");
        document.getElementsByClassName("loginError")[0].style.display = "inline";
        return false;
    } else if (userToCheck == "") {
        $("#loginErrorText").html("<p id=\"loginErrorText\">Username field is empty. Please enter a username.</p>");
        document.getElementsByClassName("loginError")[0].style.display = "inline";
        return false;
    }

    return true;
}
