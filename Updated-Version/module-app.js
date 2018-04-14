var http = require('http'),
    express = require("express"),
    testApp = express(),
    searchResults = [];

  const yelp = require('yelp-fusion');
  // Individualized API key
  const apiKey = "KAhRkGDUNpqGvR-P94ii7uH2K60Rt6GDk1msY6Yh_6DZNKxb0Q9aNNYoi-q0mos9zew6AZtMGIm6MrQFldYZ__TfeRqhJyHInCGuDGpuLIVIB5jQz6BW3gsH68nGWnYx";
  const client = yelp.client(apiKey);

//Search for food
  const searchRequest = {
    term:'food',
    location: 'Rogers Park, Chicago, IL',
    price: '1'
  };

//Search for bars
  const searchRequest2 = {
      term: 'bars',
      location: 'Rogers Park, Chicago, IL',
      price: '1'
  };

//Search for events - haven't decided how to use yet
  const searchRequest3 = {
      cost_max: '150.00',
      location: 'Northside, Chicago, IL'
  }
//creates local server
http.createServer(testApp).listen(2018);

testApp.get("", function(req, res){
    client.search(searchRequest).then(response => {
        for (i=0;i<3;i++){
        searchResults.push(response.jsonBody.businesses[i]);
        }
    });
    client.search(searchRequest2).then(response => {
        for (i=0;i<3;i++){
        searchResults.push(response.jsonBody.businesses[i]);
    }
}).then(function(){
        searchResults.forEach(function(element){
            return res.json(searchResults);
        })
    }).catch(e => {
      console.log(e);
    });
});

//trying to get it to work with events - don't use yet
// testApp.get("", function(req, res){
//     client.search(searchRequest).then(response => {
//         for (i=0;i<3;i++){
//         searchResults.push(response.jsonBody.businesses[i]);
//         }
//     });
//     client.search(searchRequest2).then(response => {
//         for (i=0;i<3;i++){
//         searchResults.push(response.jsonBody.businesses[i]);
//     }
// });
//     client.search(searchRequest3).then(response => {
//         for (i=0;i<3;i++){
//             searchResults.push(response.jsonBody.businesses[i]);
//         }
//     }).then(function(){
//         searchResults.forEach(function(element){
//             return res.json(searchResults);
//         })
//     }).catch(e => {
//       console.log(e);
//     });
// });
