'use strict';

var database = [];
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
    console.log("Initialized page");
}

function loadDatabase() {
    $.getJSON('../../database/test.json', function(data) {
        database = data.users[0];
        dataJSON = data;
        // console.log(data);
    });
}