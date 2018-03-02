var notOfAge = "You must be 21 years of age to drink. No drink specials available.";

function checkAge() {
var elDrink = document.getElementById('ageChoice2').checked;
if (elDrink === true){
    $('#results').append(notOfAge);
}
$('#submitButton').hide();
};

document.getElementById('submitButton').onclick = checkAge;

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
});};
document.getElementById('resetButton').onclick = clearResults2;

//*********************
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
//
