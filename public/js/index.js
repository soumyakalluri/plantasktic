'use strict';
var database = [];
var jsonFile = {};

// Get the modal
var modal;

// Get the button that opens the modal
var btn;
var viewBtn;
var checkBtn;

// Get the <span> element that closes the modal
var span;
var task;


// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
    loadDatabase();
})


// // When the user clicks on the button, open the modal
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    $(".task").click(displayPopup);
    $(".checkbox").click(deleteTask);
    // $("#impcheckbox").click(deleteTask);
    // $("#regcheckbox").click(deleteTask);
    modal = document.getElementById("myModal");
    span = document.getElementsByClassName("close")[0];
    viewBtn = document.getElementById("viewBtn");
    checkBtn = document.getElementById("checkBtn");
    console.log(modal);
    // console.log(btn);
    // console.log(span);
    // console.log(window);
    $(span).click(closePopup);
    $(window).click(hidePopup);
    $(viewBtn).click(viewTask);
    $(checkBtn).click(deleteTask);
}

function loadDatabase() {
    $.getJSON('../database/test.json', function(data) {
        database = data.users;
        jsonFile = data;
    });
}

function displayPopup(e) {
    console.log("displayPopup");
    task = e.currentTarget.children[1].innerText;
    modal.children[0].children[1].children[0].innerText = task;
    modal.style.display = "block";
}

function closePopup(e) {
    modal.style.display = "none";
}

function hidePopup(e) {
    if (e.target == modal) {
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
    // console.log(database[0].imptasks);

    for (var t in database[0].imptasks) {
        // console.log(t);
        if (database[0].imptasks[t].taskName == task) {
            console.log("deleted task!");
            database[0].imptasks.splice(t, 1);
            // delete database[0].imptasks[t];

            jsonFile.users = database;
            // console.log("this is updated user tasks");
            // console.log(jsonFile.users);
            $.ajax({
                type: 'POST',
                url: '/checkofftask',
                data: jsonFile,
                success: function(data) {
                    console.log(jsonFile);
                    // location.reload();
                    console.log("Checked off task successfully!");
                }
            });

            task = "";
            break;
        }
    }

    if (task != "") {
        console.log("could not find task in imptasks");
        for (var t in database[0].regtasks) {
            console.log(t);
            if (database[0].regtasks[t].taskName == task) {
                console.log("deleted task!");
                // delete database[0].regtasks[t];
                database[0].regtasks.splice(t, 1);
                // delete database[0].imptasks[t];

                jsonFile.users = database;
                // console.log("this is updated user tasks");
                // console.log(jsonFile.users);
                $.ajax({
                    type: 'POST',
                    url: '/checkofftask',
                    data: jsonFile,
                    success: function(data) {
                        console.log(jsonFile);
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
    console.log(database);

    modal.style.display = "none";
    // window.location.href = "/";
    // document.location.href = "/";
}
