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
}

function loadDatabase() {
    $.getJSON('../../database/test.json', function(data) {
        dataJSON = data;
        console.log(data);
    });
}

// document.getElementById("favoriteButton").checked