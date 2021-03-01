'use strict';
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
    $("#signupButton").click(signup);
}

function signup(e) {
    e.preventDefault();
    document.location.href = "/home";
}