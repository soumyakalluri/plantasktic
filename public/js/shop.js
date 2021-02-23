'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
    console.log("Initialized page");
    // document.getElementById("buyPlant").style.visibility = "hidden";
    // document.getElementById("buyCost").style.visibility = "hidden";
    // $(".buyButton").on('click', buyPlantTwo);
    $(".plant-item").on('click', buyPlant);

}

function buyPlant(e) {
    e.preventDefault();
    console.log(e);
    console.log(e.currentTarget.children[0]);
    var idk = e.currentTarget.children[0];
    console.log(idk.innerText);
    // console.log("Buyasd");
}

function buyPlantTwo(e) {
    e.preventDefault();
    console.log(e.currentTarget);
}