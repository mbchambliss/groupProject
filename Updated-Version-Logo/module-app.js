var http = require('http'),
    express = require('express'),
    testApp = express(),
    searchResults = [];

  const yelp = require('yelp-fusion');
  const apiKey = "KAhRkGDUNpqGvR-P94ii7uH2K60Rt6GDk1msY6Yh_6DZNKxb0Q9aNNYoi-q0mos9zew6AZtMGIm6MrQFldYZ__TfeRqhJyHInCGuDGpuLIVIB5jQz6BW3gsH68nGWnYx";
  const client = yelp.client(apiKey);

  testApp.use(express.static(__dirname + "/assets"));
  //creates local server
  http.createServer(testApp).listen(2018);
//Search for food
  const searchRequest = {
    term:'restaurants',
    location: 'Rogers Park, Edgewater, Chicago, IL',
    price: '1'
  };

//Search for bars
  const searchRequest2 = {
      term: 'bars',
      location: 'Rogers Park, Edgewater, Chicago, IL',
      price: '1'
  };

  testApp.get("", function(req, res){
      client.search(searchRequest).then(response => {
          for (i=0;i<3;i++){
          res.json(response.jsonBody.businesses[i]);
          }
      }).then(function() {
        client.search(searchRequest2).then(response => {
          for (i=0;i<3;i++){
              searchResults.push(response.jsonBody.businesses[i]);
          }
        })
    }).then(function(response) {
          searchResults.forEach(function(element){
          res.json(searchResults)
          //console.log(searchResults);
            })
        }).catch(e => {
            console.log(e);
      });
  });

//original - works but not perfectly
// testApp.get("", function(req, res){
//     client.search(searchRequest).then(response => {
//         for (i=0;i<3;i++){
//         searchResults.push(response.jsonBody.businesses[i]);
//         }
//     }).then(client.search(searchRequest2).then(response => {
//         for (i=0;i<3;i++){
//         searchResults.push(response.jsonBody.businesses[i]);
//         }
//     })).then(function(response) {
//         searchResults.forEach(function(element){
//         res.json(searchResults)
//         //console.log(searchResults);
//     })
// }).catch(e => {
//       console.log(e);
//     });
// });
