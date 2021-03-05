'use strict';

var database = [];
var jsonFile = {};

// Get the modal
var modal;
var helpModal;

// Get the button that opens the modal
var btn;
var viewBtn;
var checkBtn;
var helpBtn;

// Get the <span> element that closes the modal
var span;
var task;
var helpSpan;

// Hold the username and userIdx in the database
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
    $(".task").click(displayPopup);
    
    modal = document.getElementById("myModal");
    span = document.getElementsByClassName("close")[0];
    viewBtn = document.getElementById("viewBtn");
    checkBtn = document.getElementById("checkBtn");
    helpModal = document.getElementById("myHelpModal");
    helpBtn = document.getElementById("helpButtonImg");
    helpSpan = document.getElementById("help-close");
    
    $(helpBtn).click(displayHelpPopup);

    $(span).click(closePopup);
    $(window).click(hidePopup);
    $(checkBtn).click(deleteTask);
    $(helpSpan).click(hideHelpPopup);
    $(window).click(hideHelpPopup);
}

function loadDatabase() {
    $.getJSON('../database/test.json', function(data) {
        database = data.users;
        jsonFile = data;
        // console.log(jsonFile);
        username = retrieveUsername();
        userIdx = retrieveUserIndex(username);
    });
}

function displayPopup(e) {
    // console.log("displayPopup");
    // console.log(modal.children[0].children);
    task = e.currentTarget.children[1].innerHTML;
    modal.children[0].children[2].innerText = task;


    let imp = false;
    for (var t in database[userIdx].imptasks) {
        if (database[userIdx].imptasks[t].taskName == task) {
            modal.children[0].children[3].innerHTML = "Desc: " + database[userIdx].imptasks[t].taskDesc;
            imp = true;
            break;
        }
    }
    if (!imp) {
        for (var t in database[userIdx].regtasks) {
            if (database[userIdx].regtasks[t].taskName == task) {
                modal.children[0].children[3].innerHTML = "Desc: " + database[userIdx].regtasks[t].taskDesc;
                break;
            }
        }
    }

    modal.style.display = "block";
    e.currentTarget.children[0].src = "/images/checkbox-filled.png";
}

function closePopup(e) {
    for (var i=0; i<document.getElementsByClassName("checkbox").length; i++) {
        document.getElementsByClassName("checkbox")[i].src = "/images/checkbox-empty.png";
    }
    modal.style.display = "none";
}

function hidePopup(e) {
    if (e.target == modal) {
        for (var i=0; i<document.getElementsByClassName("checkbox").length; i++) {
            document.getElementsByClassName("checkbox")[i].src = "/images/checkbox-empty.png";
        }
        modal.style.display = "none";
    }
}

function viewTask(e) {
    e.preventDefault();
    console.log(task);
    // console.log(e.currentTarget.children[1].innerText);
}

function deleteTask(e) {
    e.preventDefault();
    var importantTask = false;

    for (var t in database[userIdx].imptasks) {
        if (database[userIdx].imptasks[t].taskName == task) {
            console.log("deleted task!");

            importantTask = true;

            database[userIdx].imptasks.splice(t, 1);

            jsonFile.users = database;
            jsonFile.users[userIdx].coins = parseInt(jsonFile.users[userIdx].coins) + 5;

            $.ajax({
                type: 'POST',
                url: '/home/' + username,
                data: jsonFile,
                success: function(data) {
                    // console.log(jsonFile);
                    location.reload();
                    console.log("Checked off task successfully!");
                }
            });

            task = "";
            break;
        }
    }

    if (task != "") {
        console.log("could not find task in imptasks");
        for (var t in database[userIdx].regtasks) {
            console.log(t);
            if (database[userIdx].regtasks[t].taskName == task) {
                console.log("deleted task!");
                database[userIdx].regtasks.splice(t, 1);


                jsonFile.users = database;
                jsonFile.users[userIdx].coins = parseInt(jsonFile.users[userIdx].coins) + 3;

                $.ajax({
                    type: 'POST',
                    url: '/home/' + username,
                    data: jsonFile,
                    success: function(data) {
                        // console.log(jsonFile);

                        location.reload();

                        console.log("Checked off task successfully!");
                    }
                });

                task = "";
                break;
            }
        }
    }

    if (task == "") {
        console.log("Successfully deleted task!");
    } else {
        console.log("could not delete task");
    }
    // console.log(database);

    modal.style.display = "none";

    if ( importantTask ) {
        alert("You've earned +5 coins!");
    } else {
        alert("You've earned +3 coins!");
    }
}

function retrieveUsername() {
    var URL = document.location.href;
    var URLcomponents = URL.split('/');
    console.log("Retrieved user: " + URLcomponents[URLcomponents.length-1]);
    return URLcomponents[URLcomponents.length-1];
}

function retrieveUserIndex(username) {
    var index = 0;
    for (var i = 0; i < jsonFile.users.length; i++) {
        var userIdx = jsonFile.users[i];
        if (userIdx['username'] == username) {
            index = i;
            break;
        }
    }
    console.log("Index of username is: " + index);
    return index;
}

function displayHelpPopup(e) {
    var helpDesc = helpModal.children[0].children[2];

    helpDesc.innerHTML = "This app is to help you stay motivated to complete your tasks.<br><br>As you "
                        + "complete tasks, you will receive coins, and you can use those coins to purchase flowers to populate their garden!"
                        + "<br><br>You can start by adding some tasks under the \"Add Task\" button. As you check them off, see if you can populate"
                        + " your garden with the flowers in the shop! :)";

    helpModal.style.display = "block";
}

function hideHelpPopup(e) {
    if (e.target == helpSpan) {
        helpModal.style.display = "none";
    }
}