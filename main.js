/**
 * Created by Michael on 1/17/2017.
 */

//Global Variables
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;

$(document).ready(function(){
    $(".card").click(card_clicked);
});

function card_clicked(){

    console.log(this);

    if ($(this).hasClass("already_clicked")) {
        second_card_clicked = null;
        return false;
    }

    $(this).find(".back").css({display: 'none'});
    console.log('After flip');

    if (first_card_clicked == null){
         first_card_clicked = $(this).find("img").attr("src");
         $(this).addClass("already_clicked");
    }
     else {
         second_card_clicked = $(this).find("img").attr("src");
         $(this).addClass("already_clicked");

         if (first_card_clicked == second_card_clicked){
             match_counter++;
             first_card_clicked = null;
             second_card_clicked = null;

             if (match_counter == total_possible_matches){
                 console.log('You Won!!');
                 setTimeout(function(){alert("You won!");});
             }
         }

         else {
             setTimeout(cardsGoFacedown, 2000);
             $(".card").off();
             first_card_clicked = null;
             second_card_clicked = null;
         }
    }

}

function cardsGoFacedown() {
        $(".back").show();
        $(".card").click(card_clicked).removeClass("already_clicked");
}