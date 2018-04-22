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
    event.preventDefault();
    $('h4').empty();
    $('ul').empty();
    $('[type="checkbox"]').each(function() {
        this.checked = false;
    });
    $('[type="date"]').val('');
    $('[type="radio"]').each(function() {
        this.checked = false;
    });
    enableSubmit();
});

function enableSubmit() {
    $("#submitButton").prop("disabled", false);
};

//code for after input and submit call
$("#theForm").submit(function(event) {
    event.preventDefault();
    $("#results").show();
    //loadBusinesses();
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

// function loadBusinesses() {
//     let yelpArray = [];
//     $.getJSON("http://localhost:2018/restaurants.json").then(response =>{
//         for (i=0;i<3;i++){
//             var objData = response.businesses[i].name;
//             var parsedData = JSON.parse(objData);
//             yelpArray.push(parsedData);
//             //yelpArray.push(response.businesses[i].name);
//         }
//         return $.getJSON("http://localhost:2018/bars.json");
//     }).then(response => {
//         for (i=0;i<3;i++){
//             yelpArray.push(response.businesses[i].name);
//         }
//     }).catch((err) => {
//         console.log('error found = ', err);
//     });
//     console.log(yelpArray);
//     //jsonData(yelpArray);
// }

function jsonData() {
    if ($("#activityChoice1").prop("checked") === true && $("#activityChoice2").prop("checked") === true && $("#ageChoice1").prop("checked") === true) {
        $.getJSON("http://localhost:2018").then(response => {
            $('p#results').append("<h4>" + "Food & Drink Specials" + "</h4>");
            for(var i=0;i<6; i++){
                $('ul#result').append("<li>" + response[i].name + "<br>" + "Price level: " +response[i].price + "<br>" + "<a href="+response[i].url+" target=\"_blank\">" + "Website" + "</a>" + "</li>");
            }
        })
} else if ($("#activityChoice1").prop("checked") === true && $("#activityChoice2").prop("checked") === true && $("#ageChoice2").prop("checked") === true) {
    $.getJSON("http://localhost:2018/restaurants").then(response => {
        $('p#results').append("<h4>" + "Food Specials" + "</h4>");
        for(var i=0;i<3; i++){
            $('ul#result').append("<li>" + response[i].name + "<br>" + "Price level: " +response[i].price + "<br>" + "<a href="+response[i].url+" target=\"_blank\">" + "Website" + "</a>" + "</li>");
        }
    })
} else if ($("#activityChoice1").prop("checked") === true) {
    $.getJSON("http://localhost:2018/restaurants").then(response => {
        $('p#results').append("<h4>" + "Food Specials" + "</h4>");
        for(var i=0;i<3; i++){
            $('ul#result').append("<li>" + response[i].name + "<br>" + "Price level: " +response[i].price + "<br>" + "<a href="+response[i].url+" target=\"_blank\">" + "Website" + "</a>" + "</li>");
            }
        })
    } else if ($("#activityChoice2").prop("checked") === true && $("#ageChoice1").prop("checked") === true){
        $.getJSON("http://localhost:2018/bars").then(response => {
        $('p#results').append("<h4>" + "Drink Specials" + "</h4>");
            for(var i=0;i<3; i++){
                $('ul#result').append("<li>" + response[i].name + "<br>" + "Price level: " +response[i].price + "<br>" + "<a href="+response[i].url+" target=\"_blank\">" + "Website" + "</a>" + "</li>");
                }
            })
        } else {
            $('p#results').append("<h4>" + "No results found based on selections." + "</h4>");
            }
}














mostPopularContent = "";
    function jsonDataSuggestions() { $.getJSON("http://localhost:2018").then(response => {
        var businessData = response;
		for (i in businessData) {
		  mostPopularContent  +=  "<div class='restaurantTabs'><div class='suggestionsTabsHeaders'>" + businessData[i].name + "</div><br>";
		  mostPopularContent  +=  "Number of reviews: " + businessData[i].review_count + "<br>";
		  mostPopularContent  +=  "Rating: " + businessData[i].rating + "<br>";
		  mostPopularContent  +=  "Phone: " + businessData[i].phone + "<br></div>";
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






//old code
// function jsonData() { $.getJSON("http://localhost:2018").then(response => {
//         if (response !== null && $("#activityChoice1").prop("checked") === true && $("#activityChoice2").prop("checked") === true && $("#ageChoice1").prop("checked") === true) {
//             $('p#results').append("<h4>" + "Food & Drink Specials" + "</h4>");
//             for(var i=0;i<6; i++){
//                 $('ul#result').append("<li>" + response[i].name + "<br>" + "Price level: " +response[i].price + "<br>" + "<a href="+response[i].url+" target=\"_blank\">" + "Website" + "</a>" + "</li>");
//             }
//         } else if (response !== null && $("#activityChoice1").prop("checked") === true && $("#activityChoice2").prop("checked") === true && $("#ageChoice2").prop("checked") === true) {
//             $('p#results').append("<h4>" + "Food Specials" + "</h4>");
//             for(var i=0;i<3; i++){
//                 $('ul#result').append("<li>" + response[i].name + "<br>" + "Price level: " +response[i].price + "<br>" + "<a href="+response[i].url+" target=\"_blank\">" + "Website" + "</a>" + "</li>");
//             }
//         } else if (response !== null && $("#activityChoice1").prop("checked") === true) {
//             $('p#results').append("<h4>" + "Food Specials" + "</h4>");
//             for(var i=0;i<3; i++){
//                 $('ul#result').append("<li>" + response[i].name + "<br>" + "Price level: " +response[i].price + "<br>" + "<a href="+response[i].url+" target=\"_blank\">" + "Website" + "</a>" + "</li>");
//             }
//         } else if (response !== null && $("#activityChoice2").prop("checked") === true && $("#ageChoice1").prop("checked") === true){
//             $('p#results').append("<h4>" + "Drink Specials" + "</h4>");
//             for(var i=3;i<6; i++){
//                 $('ul#result').append("<li>" + response[i].name + "<br>" + "Price level: " +response[i].price + "<br>" + "<a href="+response[i].url+" target=\"_blank\">" + "Website" + "</a>" + "</li>");
//             }
//         } else {
//             $('p#results').append("<h4>" + "No results found based on selections." + "</h4>");
//         }
//         }).catch((err) => {
//             console.log('error found = ', err);
//         });
//     }


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
