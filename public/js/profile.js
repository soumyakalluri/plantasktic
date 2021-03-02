'use strict';

var database = [];
var dataJSON = {};

var modal;
var span;
var logoutBtn;
var cancelBtn;

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    initializePage();
    loadDatabase();
})


/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    $("#user-logout").click(displayPopup);
    
    modal = document.getElementById("myModal");
    span = document.getElementsByClassName("close")[0];
    logoutBtn = document.getElementById("logoutBtn");
    cancelBtn = document.getElementById("cancelBtn");

    $(span).click(closePopup);
    $(window).click(hidePopup);
    $(cancelBtn).click(closePopup);
    $(logoutBtn).click(logout);

}

function loadDatabase() {
    $.getJSON('../../database/test.json', function(data) {
        database = data.users[0];
        dataJSON = data;
        console.log(data);
    });
}

function displayPopup(e) {
    e.preventDefault();
    console.log("button clicked");
    modal.style.display = "block";
}

function closePopup(e) {
    e.preventDefault();
    modal.style.display = "none";
}

function hidePopup(e) {
    if (e.target == modal) {
        modal.style.display = "none";
    }
}

function logout() {
    console.log(dataJSON);
    setTimeout(function() {
        document.location.href = "/";
    }, 100);
}