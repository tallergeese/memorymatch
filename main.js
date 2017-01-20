/**
 * Created by Michael on 1/17/2017.
 */

//Global Variables
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;

var attempts = 0;
var accuracy = 0;
var games_played = 0;

$(document).ready(function(){
    cardRandomizer();
    $(".card").click(card_clicked);
    $(".reset").click(function(){
        reset_stats();
        display_stats();
    });
});

function card_clicked(){

    if ($(this).hasClass("already_clicked")) {
        second_card_clicked = null;
        return false;
    }

    $(this).find(".back").hide();

    if (first_card_clicked == null){
         first_card_clicked = $(this);
         $(this).addClass("already_clicked");
    }
     else {
         second_card_clicked = $(this);
         $(this).addClass("already_clicked");

         attempts++;
         display_stats();

         var first_card_compare = first_card_clicked.find("img").attr("src");
         var second_card_compare = second_card_clicked.find("img").attr("src");

         if (first_card_compare.substr(0,3) === second_card_compare.substr(0,3)) {
             console.log(first_card_clicked.find("img").attr("src"));
             first_card_clicked = null;
             second_card_clicked = null;

             match_counter++;
             display_stats();

             if (match_counter >= total_possible_matches) {
                 setTimeout(winnerIsYou);
             }
         }

         else {
             $(".card").off("click");
             setTimeout(cardsGoFacedown, 2000);

         }
    }
}

function cardsGoFacedown() {
    first_card_clicked.find(".back").show();
    second_card_clicked.find(".back").show();
    $(".card").click(card_clicked).removeClass("already_clicked");
    first_card_clicked = null;
    second_card_clicked = null;
}

function display_stats(){
    $(".games-played .value").text(games_played);
    $(".attempts .value").text(attempts);
    if (attempts != 0 || match_counter != 0) {
        accuracy = Math.floor((match_counter/attempts * 10000))/100 + "%";
        $(".accuracy .value").text(accuracy);
    }
    else{
        $(".accuracy .value").text("---");
    }
}

function winnerIsYou(){
    var $winner = $("<div>").addClass("winner").text("YOU WON!");
    var $reset = $("<button>").addClass("reset").text("CARRY ON");
    $("body").append($winner);
    $(".winner").append($reset);
    $(".winner .reset").click(function(){
        reset_stats();
        display_stats();
    });

}

function reset_stats(){
    $(".winner").remove();
    accuracy = 0;
    match_counter = 0;
    attempts = 0;
    games_played++;

    $(".back").show();
    $(".card").click(card_clicked).removeClass("already_clicked");
    first_card_clicked = null;
    second_card_clicked = null;

    display_stats();
    cardRandomizer();
}

//RANDOMIZER
function getRandomNumber(min, max){
    return Math.floor(Math.random()*(max-min+1)) + min;
}

function cardRandomizer(){
    for (var i = 0; i < 100; i++){
        var random = getRandomNumber(1,18);
        var randomizedCard = $(".card:nth-child(" + random + ")");
        $("#game-area").append(randomizedCard);
    }
}

//