//accordion JS was from taken from W3 schools tutorial
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}

//openPage was influenced by W3 schools "Full Page Tab" tutorial, but we only borrowed certain parts
function openPage(pageName,elmnt) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    document.getElementById(pageName).style.display = "block";
}
document.getElementById("defaultOpen").click();

//resetButton
$("#resetButton").click(function() {
    $(function() {
        $('p#results').empty();
        $('ul#result').empty();
        $('[type="checkbox"]').each(function() {
        this.checked = false;
    });
        $('[type="date"]').val('');
        $('[type="radio"]').each(function() {
    this.checked = false;
    });
    enableSubmit();
});});

$( "#theForm" ).submit(function( event ) {
        event.preventDefault();
        $("p#results").show();
        checkFood();
        checkAge();
        checkEvent();
        disableSubmit();
        $("li").addClass("newLi");
});

$.getJSON("localhost:2018.json", function (response) {
    console.log("response = " +response.toSource());
});

$("p#results").hide();
$("#submitButton").click(function() {
    $( "#theForm" ).submit();
});

//https://stackoverflow.com/questions/15122526/disable-button-in-jquery
function disableSubmit() {
    $("#submitButton").prop("disabled", true);
};

function enableSubmit() {
    $("#submitButton").prop("disabled", false);
};

// function checkAge() {
//     var notOfAge = "You must be 21 years of age to drink. No drink specials available.";
//     var ofAge = "Here are your specials: ";
//     if ($('#ageChoice2').prop("checked") === true){
//         $('p#results').append(notOfAge);
//     } else {
//         $('p#results').append(ofAge);
//     }
// };

// var list = $('p#results');
// var newListItem = document.createElement('li');

function checkAge() {
    var notOfAge = "You must be 21 years of age to drink. No drink specials available.";
    var ofAge = "Here are your specials: ";
    if ($('#ageChoice2').prop("checked") === true){
        $('ul#result').append("<li>" + notOfAge + "</li>");
    } else {
        $('ul#result').append("<li>" + ofAge + "</li>");
    }
};


function checkFood(){
    var Foodrecommend1 = "Flaco's Tacos is what we recommend, here is the address: 1116-20 West Granville, check their website for details. ";
    var Foodrecommend2 = "Veranda Restaurant & Coffee, it gives 10% off to Loyola students with valid Student ID. ";
        if ($("#activityChoice1").prop("checked") === true && $("#studentChoice1").prop("checked") === true ) {
            $('ul#result').append("<li>" + Foodrecommend2 + "</li>" + "<li>" + Foodrecommend1 + "</li>");
        }
        else if ($("#activityChoice1").prop("checked") === true) {
            $('ul#result').append("<li>" + Foodrecommend1 + "</li>");
        }
};

var Eventrecommend1 = "Men's Volleyball vs Ball State. ";
var Eventrecommend2 = "Loyola Fine Arts Exibition. ";
var CommunityEvent = "Mosaic Art Classes Available. ";

function checkEvent() {
    var eventChoice = $('#activityChoice3').prop("checked");
    // var dateChoice = document.getElementById('date').checked;
    if (eventChoice === true)
    {
        $('#results').append(Eventrecommend1, Eventrecommend2, CommunityEvent);
    }
};
