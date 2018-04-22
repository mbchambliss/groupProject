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
    $('#results').empty();
    $('ul').empty();
    $('li').empty();
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

function jsonData() {
    if ($("#activityChoice1").prop("checked") === true && $("#activityChoice2").prop("checked") === true && $("#ageChoice1").prop("checked") === true) {
        $.getJSON("http://localhost:2018").then(response => {
            $('p#results').append("<h4>" + "Cheap Food & Bar Options" + "</h4>");
            for(var i=0;i<6; i++){
                $('ul#result').append("<li>" + response[i].name + "<br>" + "Price level: " +response[i].price + "<br>" + "<a href="+response[i].url+" target=\"_blank\">" + "Website" + "</a>" + "<img class='zoom' class='locationImg' src=\'" + response[i].image_url + "'/></li>");
            }
        })
} else if ($("#activityChoice1").prop("checked") === true && $("#activityChoice2").prop("checked") === true && $("#ageChoice2").prop("checked") === true) {
    $.getJSON("http://localhost:2018/restaurants").then(response => {
        $('p#results').append("<h4>" + "Cheap Food Options" + "</h4>");
        for(var i=0;i<3; i++){
            $('ul#result').append("<li>" + response[i].name + "<br>" + "Price level: " +response[i].price + "<br>" + "<a href="+response[i].url+" target=\"_blank\">" + "Website" + "</a>" + "<img class='zoom' class='locationImg' src=\'" + response[i].image_url + "'/></li>");
        }
    })
} else if ($("#activityChoice1").prop("checked") === true) {
    $.getJSON("http://localhost:2018/restaurants").then(response => {
        $('p#results').append("<h4>" + "Cheap Food Options" + "</h4>");
        for(var i=0;i<3; i++){
            $('ul#result').append("<li>" + response[i].name + "<br>" + "Price level: " +response[i].price + "<br>" + "<a href="+response[i].url+" target=\"_blank\">" + "Website" + "</a>" + "<img class='zoom' class='locationImg' src=\'" + response[i].image_url + "'/></li>");
            }
        })
    } else if ($("#activityChoice2").prop("checked") === true && $("#ageChoice1").prop("checked") === true){
        $.getJSON("http://localhost:2018/bars").then(response => {
        $('p#results').append("<h4>" + "Cheap Bar Options" + "</h4>");
            for(var i=0;i<3; i++){
                $('ul#result').append("<li>" + response[i].name + "<br>" + "Price level: " +response[i].price + "<br>" + "<a href="+response[i].url+" target=\"_blank\">" + "Website" + "</a><br>" + "<img class='zoom' class='locationImg' src=\'" + response[i].image_url + "'/></li>");
                }
            })
        } else {
            $('p#results').append("<h4>" + "No results based on your selections." + "</h4>");
            }
}

function jsonDataSuggestions() { $.getJSON("http://localhost:2018").then(response => {
    var lookup = {};
    var items = response;
    var result = [];

    for (var item, i = 0; item = items[i++];) {
        var id = item.id;
        if (!(id in lookup)) {
            lookup[id] = 1;
            result.push(item);
        }
    }

    var businessData = result;
    var distancesArray = businessData.map(a => a.distance);
    Array.min = function( array ){
        return Math.min.apply( Math, array );
    };
    document.getElementById("mostPopular").innerHTML = "";
    document.getElementById("categories").innerHTML = "";
    document.getElementById("closest").innerHTML = "";

    mostPopularContent = document.getElementById("mostPopular").innerHTML;
    pricesContent = document.getElementById("categories").innerHTML;
    closestContent = document.getElementById("closest").innerHTML;
    var closestDistance = Array.min(distancesArray);
		for (i in businessData) {
            if(businessData[i].rating >= 4.5) {
                mostPopularContent  +=  "<div class='restaurantTabs'><div class='suggestionsTabsHeaders'>" + businessData[i].name + "</div><br>";
                mostPopularContent  +=  "Number of reviews: " + businessData[i].review_count + "<br>";
                mostPopularContent  +=  "Rating: " + businessData[i].rating + "<br>";
                mostPopularContent  +=  "Phone: " + businessData[i].phone + "<br></div>";
                }

                if(businessData[i].price.length == 1) {
                    pricesContent  +=  "<div class='restaurantTabsPrices'><div class='suggestionsTabsHeaders'></div><br><br>";
                    pricesContent  +=   businessData[i].name + "<br>";
                    pricesContent  +=  "<img class='zoom' src='" + businessData[i].image_url + "' height='75' name='restaurantImage'"+
                    "onmouseover=\"restaurantImage.width='300';restaurantImage.height='200';\""+
                    "onmouseout=\"restaurantImage.width='150';restaurantImage.height='100';\" /> <br>";
                    pricesContent  +=  "Address: " + businessData[i].location.display_address + "<br></div>";
                }

                if(businessData[i].distance == closestDistance){
                    closestContent  +=  "<div class='restaurantTabsPrices'><div class='suggestionsTabsHeaders'></div><br><br>";
                    closestContent  +=   businessData[i].name + "<br>";
                    closestContent  +=   "Phone: " + businessData[i].phone + "<br>";
                    closestContent  +=  "<img src='" + businessData[i].image_url + "' height='75' name='restaurantImage'"+
                    "onmouseover=\"restaurantImage.width='300';restaurantImage.height='200';\""+
                    "onmouseout=\"restaurantImage.width='150';restaurantImage.height='100';\" /> <br>";
                    closestContent  +=  "Address: " + businessData[i].location.display_address + "<br></div>";
                }

        }
        document.getElementById("mostPopular").innerHTML = mostPopularContent;
        document.getElementById("categories").innerHTML = pricesContent;
        document.getElementById("closest").innerHTML = closestContent;
            }).catch((err) => {
			document.getElementById("mostPopular").innerHTML = "Data not available.";
			document.getElementById("categories").innerHTML = "Data not available.";
			document.getElementById("closest").innerHTML = "Data not available.";
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
