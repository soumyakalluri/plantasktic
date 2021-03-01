'use strict';

var database = [];
var dataJSON = {};
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    initializePage();
    loadDatabase();
    modal = document.getElementById("myModal");
    span = document.getElementsByClassName("close")[0];
})


/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    console.log("Initialized page");
    // $(".buyButton").on('click', buyPlantTwo);
    // $("#buyButtonContainer").on('click', buyPlantTwo);
    $(".plant-item").on('click', buyPlant);
    $("span.close").on('click', closePopUp);

}

function loadDatabase() {
    $.getJSON('../../database/test.json', function(data) {
        database = data.users[0];
        dataJSON = data;
        console.log(data);
        document.getElementById("amountOfCoins").innerText = "Coins: " + database['coins'];
    });
}

function buyPlant(e) {
    e.preventDefault();
    // console.log(e.currentTarget.children);

    var plantInfo = e.currentTarget.children[0].innerText;
    console.log(plantInfo);

    var plantImg = plantInfo.replace(/\s+/g, '-').toLowerCase();

    var hasPlant = false;
    for ( var i = 0; i < database['plants'].length; i++ ) {
        if (database['plants'][i]['plantName'] == plantInfo) {
            hasPlant = true;
            break;
        }
    }

    var costItems = (e.currentTarget.children[1].textContent).split(": ");
    console.log(costItems);

    if (parseInt(database['coins']) < parseInt(costItems[1])) {
        // console.log("coins: " + database['coins']);
        // document.getElementsByClassName("purchaseConfirmation")[0].innerText = "You do not have enough coins!";
        $(".purchaseConfirmation").html("<p class=\"purchaseConfirmation\">You do not have enough coins!</p>");
        document.getElementsByClassName("purchaseConfirmation")[0].style.color = "red";
    } else if (hasPlant) {
        // document.getElementsByClassName("purchaseConfirmation")[0].innerText = "You already have a " + plantInfo + "!";
        $(".purchaseConfirmation").html("<p class=\"purchaseConfirmation\">You already have a " + plantInfo + "!</p>");
        document.getElementsByClassName("purchaseConfirmation")[0].style.color = "red";
    } else {
        database['coins'] = database['coins'] - costItems[1];
        document.getElementById("amountOfCoins").innerText = "Coins: " + database['coins'];

        // document.getElementsByClassName("purchaseConfirmation")[0].innerText = "You purchased a " + plantInfo + "!";
        $(".purchaseConfirmation").html("<p class=\"purchaseConfirmation\">You purchased a " + plantInfo + "!</p>");
        document.getElementsByClassName("purchaseConfirmation")[0].style.color = "black";
        
        database.plants.push({'srcImg': plantImg, 'plantName': plantInfo});
        dataJSON.users[0] = database;
        $.ajax({
            type: 'POST',
            url: '/purchaseplant',
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

function buyPlantTwo(e) {
    e.preventDefault();
    console.log(e.currentTarget);
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