function clearResults2() {
    $(function() {
        $('p#results').empty();
        $('[type="checkbox"]').each(function() {
        this.checked = false;
    });
        $('[type="date"]').val('');
        $('[type="radio"]').each(function() {
    this.checked = false;
    });
    $('#submitButton').show();
    $('#results').hide();
});};
document.getElementById('resetButton').onclick = clearResults2;

function showDeals1() {
    $(function(){
    $('p#show-week').toggle();
});};

function showDeals2() {
    $(function(){
    $('p#show-popular').toggle();
});};

function showDeals3() {
    $(function(){
    $('p#show-best').toggle();
});};

function showDeals4() {
    $(function(){
    $('p#show-staff').toggle();
});};

document.getElementById('week').onclick = showDeals1;
document.getElementById('popular').onclick = showDeals2;
document.getElementById('best').onclick = showDeals3;
document.getElementById('staff').onclick = showDeals4;
//use a switch statement for sidebar, example:
// status = 'closed'; // set the default menu status

function checkResults(){
    var styles = {
        "height": "auto",
        "border-style": "solid"
    };
    $('#results').show().css(styles);
    $('#submitButton').hide();
    checkFood();
    checkAge();
    checkEvent();
};
document.getElementById('submitButton').onclick = checkResults;

var notOfAge = "You must be 21 years of age to drink. No drink specials available.";

function checkAge() {
    var elDrink = document.getElementById('ageChoice2').checked;
    if (elDrink === true){
        $('#results').append(notOfAge);
    }
};

function checkFood(){
var FoodChoice = document.getElementById('activityChoice1').checked;
var StudentChoice = document.getElementById('studentChoice1').checked;
    if (FoodChoice === true && StudentChoice === true ) {
        $('#results').append(Foodrecommend2, Foodrecommend1);
    }
    else if (FoodChoice === true && StudentChoice === false) {
        $('#results').append(Foodrecommend1);
    }
};

var Foodrecommend1 = "Flaco's Tacos is what we recommend, here is the address: 1116-20 West Granville, check their website for details. ";
//need to show URL as clickable
var Foodrecommend2 = "Veranda Restaurant & Coffee, it gives 10% off to Loyola students with valid Student ID. ";


var Eventrecommend1 = "Men's Volleyball vs Ball State. ";
var Eventrecommend2 = "Loyola Fine Arts Exibition. ";
var CommunityEvent = "Mosaic Art Classes Available. ";

function checkEvent() {
    var eventChoice = document.getElementById('activityChoice3').checked;
    // var dateChoice = document.getElementById('date').checked;
    if (eventChoice === true)
    {
        $('#results').append(Eventrecommend1, Eventrecommend2, CommunityEvent);
    }
};
