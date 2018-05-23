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

//Suggestions code

var i, x ="";

/*
var jsonArray = [
  {
    "dayOfWeek": "Monday",
    "nameOfRestaurant" : "Rogers Park Social",
    "special" : "$6 Glasses of Wine",
    "address" : "6920 N Glenwood Ave., Chicago, IL 60626"
  },
  {
    "dayOfWeek": "Tuesday",
    "nameOfRestaurant" : "R Public House",
    "special" : "$5 Burger Monday",
    "address" : "1508 W Jarvis Ave., Chicago, IL 60626"
  },
  {
    "dayOfWeek": "Wednesday",
    "nameOfRestaurant" : "Pub 626",
    "special" : "$10 Mussels and $5 Mules",
    "address" : "1406 W Morse Ave, Chicago, IL 60626"
  },
  {
    "dayOfWeek": "Thursday",
    "nameOfRestaurant" : "J.B. Albertos's",
    "special" : "1/2 Chicken Dinner for $8.50",
    "address" : "1326 West Morse Avenue, Chicago, IL 60626"
  },
  {
    "dayOfWeek": "Friday",
    "nameOfRestaurant" : "Bulldog Ale House",
    "special" : "All You Can Eat Fish Fry $10.99",
    "address" : "6606 N Sheridan Rd, Chicago, IL 60626"
  },
  {
    "dayOfWeek": "Saturday",
    "nameOfRestaurant" : "Bangers & Lace",
    "special" : "$3 Hot Dog and Chips",
    "address" : "810 Grove St, Evanston, IL 60201"
  },
  {
    "dayOfWeek": "Sunday",
    "nameOfRestaurant" : "Lighthouse Tavern",
    "special" : "Crabs: $1 per oz",
    "address" : "7301 N Sheridan Rd, Chicago, IL 60626"
  }
];

for (i in jsonArray) {
  x  +=  "<div class='restaurantTabs'><div class='suggestionsTabsHeaders'>" + jsonArray[i].dayOfWeek + "</div><br>";
  x  +=  jsonArray[i].nameOfRestaurant + "<br>";
  x  +=  jsonArray[i].special + "<br>";
  x  +=  jsonArray[i].address + "<br></div>";
}

  document.getElementById("thisWeeksSpecials").innerHTML = x;

*/

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
            mostPopularContent  +=  "<div class='restaurantTabsPrices'><div class='suggestionsTabsHeaders'></div><br><br>";
            mostPopularContent  +=  businessData[i].name + "<br><br>";
            mostPopularContent  +=  "<img class='zoom' src='" + businessData[i].image_url + "' height='75' name='restaurantImage'"+
            "onmouseover=\"restaurantImage.width='300';restaurantImage.height='200';\""+
            "onmouseout=\"restaurantImage.width='150';restaurantImage.height='100';\" /> <br>";
            mostPopularContent  +=  "Number of reviews: " + businessData[i].review_count + "<br>";
            mostPopularContent  +=  "Rating: " + businessData[i].rating + "<br>";
            mostPopularContent  +=  "Phone: " + businessData[i].phone + "<br></div>";
        }

        if(businessData[i].price.length == 1) {
            pricesContent  +=  "<div class='restaurantTabsPrices'><div class='suggestionsTabsHeaders'></div><br><br>";
            pricesContent  +=   businessData[i].name + "<br><br>";
            pricesContent  +=  "<img class='zoom' src='" + businessData[i].image_url + "' height='75' name='restaurantImage'"+
            "onmouseover=\"restaurantImage.width='300';restaurantImage.height='200';\""+
            "onmouseout=\"restaurantImage.width='150';restaurantImage.height='100';\" /> <br>";
            pricesContent  +=  "Price level: " + businessData[i].price + "<br>";
            pricesContent  +=  "Address: " + businessData[i].location.display_address + "<br></div>";
        }

        if(businessData[i].distance == closestDistance){
            closestContent  +=  "<div class='restaurantTabsPrices'><div class='suggestionsTabsHeaders'></div><br><br>";
            closestContent  +=   businessData[i].name + "<br><br>";
            closestContent  +=  "<img class= 'zoom' src='" + businessData[i].image_url + "' height='75' name='restaurantImage'"+
            "onmouseover=\"restaurantImage.width='300';restaurantImage.height='200';\""+
            "onmouseout=\"restaurantImage.width='150';restaurantImage.height='100';\" /> <br>";
            closestContent  +=   "Phone: " + businessData[i].phone + "<br>";
            closestContent  +=  "Address: " + businessData[i].location.display_address + "<br></div>";
             lat = businessData[i].coordinates.latitude;
             lon = businessData[i].coordinates.longitude;
             var lat, lon, zoom = 0;
             var address = businessData[i].name + ", " + businessData[i].location.display_address.join();
             zoom = 16;
             displayMapAt(lat, lon, zoom, address)
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
    function displayMapAt(lat, lon, zoom, address) {
        $("#map")
                .html(
                        "<iframe id=\"map_frame\" "
                                + "width=\"500px\" height=\"400px\" frameborder=\"0\" scrolling=\"no\" marginheight=\"0\" marginwidth=\"0\" "
                                + "src=\"https://www.google.com/maps/embed/v1/place?key=AIzaSyAF4PzD_uWhVxLmHj8f-WdOkMg_iWHLLfs&q="
                                + address
                                + "&zoom=" + zoom + "\"" + "></iframe>");

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
