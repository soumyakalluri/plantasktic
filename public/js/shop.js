'use strict';

var database = [];
var dataJSON = {};
var username;
var userIdx;
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    username = document.location.href.split("/")[(document.location.href.split("/")).length-1];
    loadDatabase();
    initializePage();
    modal = document.getElementById("myModal");
    span = document.getElementsByClassName("close")[0];
})


/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    console.log("Initialized page");
    $(".plant-item").on('click', buyPlant);
    $("span.close").on('click', closePopUp);

}

function loadDatabase() {
    $.getJSON('../../database/test.json', function(data) {
        dataJSON = data;
        console.log(data);
        userIdx = retrieveUserIndex(username);
        document.getElementById("amountOfCoins").innerText = "Coins: " + database['coins'];
    });
}

function buyPlant(e) {
    e.preventDefault();
    // console.log(e.currentTarget.children);
    if (database['plants'] == null) {
        database['plants'] = [];
    }

    var plantInfo = e.currentTarget.children[0].innerText;
    console.log(plantInfo);

    var plantImg = plantInfo.replace(/\s+/g, '-').toLowerCase();

    var hasPlant = false;
    console.log(dataJSON);
    console.log(database);
    for ( var i = 0; i < database['plants'].length; i++ ) {
        if (database['plants'][i]['plantName'] == plantInfo) {
            hasPlant = true;
            break;
        }
    }

    var costItems = (e.currentTarget.children[1].textContent).split(": ");
    console.log(costItems);
    if (hasPlant) {
        $(".purchaseConfirmation").html("<p class=\"purchaseConfirmation\">You already have a " + plantInfo + "!</p>");
        document.getElementsByClassName("purchaseConfirmation")[0].style.color = "red";
    } else if (parseInt(database['coins']) < parseInt(costItems[1])) {
        $(".purchaseConfirmation").html("<p class=\"purchaseConfirmation\">You do not have enough coins!</p>");
        document.getElementsByClassName("purchaseConfirmation")[0].style.color = "red";
    } else {
        database['coins'] = database['coins'] - costItems[1];
        document.getElementById("amountOfCoins").innerText = "Coins: " + database['coins'];

        $(".purchaseConfirmation").html("<p class=\"purchaseConfirmation\">You purchased a " + plantInfo + "!</p>");
        document.getElementsByClassName("purchaseConfirmation")[0].style.color = "black";
        
        database.plants.push({'srcImg': plantImg, 'plantName': plantInfo});
        dataJSON.users[userIdx] = database;

        $.ajax({
            type: 'POST',
            url: '/purchasedPlant/' + username,
            data: dataJSON,
            success: function(data) {
                console.log("Updated JSON: ");
                console.log(dataJSON);
                console.log("Purchased plant successfully!");
            }
        });
    }
    // console.log(database);
    modal.style.display = "block";
}

function closePopUp(e) {
    e.preventDefault();
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function retrieveUserIndex(username) {
    var index = 0;
    for (var i = 0; i < dataJSON.users.length; i++) {
        var userIdx = dataJSON.users[i];
        if (userIdx['username'] == username) {
            index = i;
            database = userIdx;
            break;
        }
    }
    console.log("User index is:" + index)
    return index;
}