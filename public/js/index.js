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
    // $(".checkbox").click(displayPopup);
    // $("#impcheckbox").click(deleteTask);
    // $("#regcheckbox").click(deleteTask);
    modal = document.getElementById("myModal");
    span = document.getElementsByClassName("close")[0];
    viewBtn = document.getElementById("viewBtn");
    checkBtn = document.getElementById("checkBtn");
    // console.log(modal);
    // console.log(btn);
    // console.log(span);
    // console.log(window);
    $(span).click(closePopup);
    $(window).click(hidePopup);
    // $(viewBtn).click(viewTask);
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
    console.log(modal.children[0].children);
    task = e.currentTarget.children[1].innerHTML;
    modal.children[0].children[2].innerText = task;


    let imp = false;
    for (var t in database[0].imptasks) {
        if (database[0].imptasks[t].taskName == task) {
            modal.children[0].children[3].innerHTML = "Desc: " + database[0].imptasks[t].taskDesc;
            imp = true;
            break;
        }
    }
    if (!imp) {
        for (var t in database[0].regtasks) {
            if (database[0].regtasks[t].taskName == task) {
                modal.children[0].children[3].innerHTML = "Desc: " + database[0].regtasks[t].taskDesc;
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
    // console.log(database[0].imptasks);

    for (var t in database[0].imptasks) {
        // console.log(t);
        if (database[0].imptasks[t].taskName == task) {
            console.log("deleted task!");

            importantTask = true;

            database[0].imptasks.splice(t, 1);
            // delete database[0].imptasks[t];

            jsonFile.users = database;
            jsonFile.users[0].coins = parseInt(jsonFile.users[0].coins) + 5;
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
                jsonFile.users[0].coins = parseInt(jsonFile.users[0].coins) + 3;
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

    if ( importantTask ) {
        alert("You've earned +5 coins!");
    } else {
        alert("You've earned +3 coins!");
    }
    // window.location.href = "/";
    // document.location.href = "/";
}
