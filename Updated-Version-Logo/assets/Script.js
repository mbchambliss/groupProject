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
	
	if(pageName == 'Suggestions'){
        jsonDataSuggestions();
		

    }
}
document.getElementById("defaultOpen").click();

//Reset Button
$("#resetButton").click(function() {
    location.reload();
    // event.preventDefault();
    // $('p#results').hide();
    // $('ul#result').hide();
    // $('li').empty().hide();
    // $('h4').empty().hide();
    // $('[type="checkbox"]').each(function() {
    //     this.checked = false;
    // });
    // $('[type="date"]').val('');
    // $('[type="radio"]').each(function() {
    //     this.checked = false;
    // });
    // enableSubmit();
});

function enableSubmit() {
    $("#submitButton").prop("disabled", false);
};

//code for after input and submit call
$("#theForm").submit(function(event) {
    event.preventDefault();
    $("p#results").show();
    jsonData();
    disableSubmit();
});

function getJSON(url){
    return new Promise((resolve, reject) => {
        const xobj = new XMLHttpRequest();
        xobj.open('GET', url);
        xobj.onload = function(data) {
            try {
                if (this.status === 200){
                    resolve(JSON.parse(this.response));
                } else {
                    reject(this.status + " " + this.statusText);
                }
            } catch(e){
                reject(e.message);
            }
        };
        xobj.onerror = function() {
            reject(this.status + " " + this.statusText);
        };
        xobj.send();
        });
    }

function jsonData() { $.getJSON("http://localhost:2018").then(response => {
            if (response !== null && $("#activityChoice1").prop("checked") === true && $("#activityChoice2").prop("checked") === true && $("#ageChoice1").prop("checked") === true) {
                $('p#results').append("<h4>" + "Food & Drink Specials" + "</h4>");
                for(var i=0;i<6; i++){
                $('ul#result').append("<li>" + response[i].name + "<br>" + "Price level: " +response[i].price + "</li>");
                }
            } else if (response !== null && $("#activityChoice1").prop("checked") === true && $("#activityChoice2").prop("checked") === true && $("#ageChoice2").prop("checked") === true) {
                $('p#results').append("<h4>" + "Food Specials" + "</h4>");
                for(var i=0;i<3; i++){
                $('ul#result').append("<li>" + response[i].name + "<br>" + "Price level: " +response[i].price + "</li>");
                }
            } else if (response !== null && $("#activityChoice1").prop("checked") === true) {
                $('p#results').append("<h4>" + "Food Specials" + "</h4>");
                for(var i=0;i<3; i++){
                    $('ul#result').append("<li>" + response[i].name + "<br>" + "Price level: " +response[i].price + "</li>");
                }
            } else if (response !== null && $("#activityChoice2").prop("checked") === true && $("#ageChoice1").prop("checked") === true){
                $('p#results').append("<h4>" + "Drink Specials" + "</h4>");
                for(var i=3;i<6; i++){
                    $('ul#result').append("<li>" + response[i].name + "<br>" + "Price level: " +response[i].price + "</li>");
                }
            } else {
                $('p#results').append("<h4>" + "No results found based on selections." + "</h4>");
            }
        }).catch((err) => {
            console.log('error found = ', err);
        });
    }
	mostPopularContent = document.getElementById("mostPopular").innerHTML;
	    function jsonDataSuggestions() { $.getJSON("http://localhost:2018").then(response => {
            var businessData = response;
				for (i in businessData) {
                    if(businessData[i].rating >= 4.5) {
                        mostPopularContent  +=  "<div class='restaurantTabs'><div class='suggestionsTabsHeaders'>" + businessData[i].name + "</div><br>";
                        mostPopularContent  +=  "Number of reviews: " + businessData[i].review_count + "<br>";
                        mostPopularContent  +=  "Rating: " + businessData[i].rating + "<br>";
                        mostPopularContent  +=  "Phone: " + businessData[i].phone + "<br></div>";
                    }
                }
			document.getElementById("mostPopular").innerHTML = mostPopularContent;
        }).catch((err) => {			
				document.getElementById("mostPopular").innerHTML = "Data not available.";
				console.log('error found = ', err);
        });
    }

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








// $("#theForm").submit(function(event) {
//     event.preventDefault();
//     $("p#results").show();
//     $.getJSON("http://localhost:2018", function(data){
//             for(var i=0;i<data.length; i++){
//                 $('ul#result').append("<li>" + data[i].name + ": price level: " +data[i].price + "</li>");
//         }
//     });
//     disableSubmit();
//     $("li").addClass("newLi");
// });

// var xobj = new XMLHttpRequest();
// xobj.open('GET', "http://localhost:2018");
// xobj.onload = function(data) {
// };
// xobj.send();


//-----NEEDS WORK!
// $("#theForm").submit((function(event) {
//     event.preventDefault();
//     $("p#results").show();
// })).then(function(){
//         getJSON("http://localhost:2018").then(response => {
//             if (response !== null) {
//                 for(var i=0;i<6; i++){
//                 $('ul#result').append("<li>" + response[i].name + ": price level: " +response[i].price + "</li>");
//                 }
//             }
//         }).catch((err) => {
//             console.log('error found = ', err);
//         });
//     }).done(function() {
//             disableSubmit();
//             $("li").addClass("newLi");
//         });



//add details of what you want done here!!
    // getJSON("http://localhost:2018").then(response => {
    //     if (response !== null) {
    //         for(var i=0;i<6; i++){
    //         $('ul#result').append("<li>" + response[i].name + ": price level: " +response[i].price + "</li>");
    //         }
    //     }
    // }).catch((err) => {
    //     console.log('error found = ', err);
    // });


//Promise
// const appPromise = new Promise((resolve, reject) => {
//     resolve();
// });
// appPromise.then(data => {
//     console.log("promise value = "+data);
// }, err => {
//     console.log("an error occurred.");
// });

// function checkAge() {
//     var notOfAge = "You must be 21 years of age to drink. No drink specials available.";
//     var ofAge = "Here are your specials: ";
//     if ($('#ageChoice2').prop("checked") === true){
//         $('ul#result').append("<li>" + notOfAge + "</li>");
//     } else {
//         $('ul#result').append("<li>" + ofAge + "</li>");
//     }
// };
//
// function checkFood(){
//     var Foodrecommend1 = "Flaco's Tacos is what we recommend, here is the address: 1116-20 West Granville, check their website for details. ";
//     var Foodrecommend2 = "Veranda Restaurant & Coffee, it gives 10% off to Loyola students with valid Student ID. ";
//         if ($("#activityChoice1").prop("checked") === true && $("#studentChoice1").prop("checked") === true ) {
//             $('ul#result').append("<li>" + Foodrecommend2 + "</li>" + "<li>" + Foodrecommend1 + "</li>");
//         }
//         else if ($("#activityChoice1").prop("checked") === true) {
//             $('ul#result').append("<li>" + Foodrecommend1 + "</li>");
//         }
// };

//original submit - works!
// $( "#theForm" ).submit(function( event ) {
//         event.preventDefault();
//         $("p#results").show();
//         checkFood();
//         checkAge();
//         checkEvent();
//         disableSubmit();
//         $("li").addClass("newLi");
// });


//original getJSON - works!
// $.getJSON("http://localhost:2018", function(data){
//     for(var i=0;i<data.length; i++){
//         //below just for testing - Works!
//         //push to an array then iterate through and add li to results
//         console.log(data[i].name + ": price level: " +data[i].price);
//     }
//     });


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

// var Eventrecommend1 = "Men's Volleyball vs Ball State. ";
// var Eventrecommend2 = "Loyola Fine Arts Exibition. ";
// var CommunityEvent = "Mosaic Art Classes Available. ";
//
// function checkEvent() {
//     var eventChoice = $('#activityChoice3').prop("checked");
//     // var dateChoice = document.getElementById('date').checked;
//     if (eventChoice === true)
//     {
//         $('#results').append(Eventrecommend1, Eventrecommend2, CommunityEvent);
//     }
// };
