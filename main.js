/**
 * Created by Michael on 1/17/2017.
 */

//Global Variables
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;

var attempts = 0;
var accuracy = 0;
var games_played = 0;

$(document).ready(function(){
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
         first_card_clicked = $(this).find("img").attr("src");
         $(this).addClass("already_clicked");
    }
     else {
         second_card_clicked = $(this).find("img").attr("src");
         $(this).addClass("already_clicked");

         attempts++;
         console.log("attempts", attempts);
         display_stats();

         if (first_card_clicked == second_card_clicked) {
             first_card_clicked = null;
             second_card_clicked = null;

             match_counter++;
             display_stats();
             console.log("match_counter", match_counter);


             if (match_counter >= total_possible_matches) {
                 setTimeout(function () {
                     alert("You won!");
                 });
             }
         }

         else {
             setTimeout(cardsGoFacedown, 2000);
             $(".card").off();
         }
    }
}

function cardsGoFacedown() {
    $(".back").show();
    $(".card").click(card_clicked).removeClass("already_clicked");
    first_card_clicked = null;
    second_card_clicked = null;
}

function display_stats(){
    $(".games-played .value").text(games_played);
    $(".attempts .value").text(attempts);
    if (attempts != 0 || match_counter != 0) {
        accuracy = (match_counter/attempts * 100) + "%";
        $(".accuracy .value").text(accuracy);
    }
    else{
        $(".accuracy .value").text("---");
    }
}

function reset_stats(){
    accuracy = 0;
    match_counter = 0;
    attempts = 0;
    games_played++;
    cardsGoFacedown();
    display_stats();
}