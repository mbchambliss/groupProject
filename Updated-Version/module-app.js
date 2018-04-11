var http = require('http'),
    express = require("express"),
    testApp = express();

  const yelp = require('yelp-fusion');
  // Place holder for Yelp Fusion's API Key
  const apiKey = "KAhRkGDUNpqGvR-P94ii7uH2K60Rt6GDk1msY6Yh_6DZNKxb0Q9aNNYoi-q0mos9zew6AZtMGIm6MrQFldYZ__TfeRqhJyHInCGuDGpuLIVIB5jQz6BW3gsH68nGWnYx";
  const client = yelp.client(apiKey);

  const searchRequest = {
    term:'food',
    location: 'Edgewater, Chicago, IL',
    price: '1'
  };
  
//route for new server below; open in web browser: http://localhost:2018
http.createServer(testApp).listen(2018);

testApp.get("/", function(req, res){
    //res.json(yelpData);
    client.search(searchRequest).then(response => {
      const firstResult = response.jsonBody.businesses[0];
      res.json(firstResult);
    }).catch(e => {
      console.log(e);
    });
});
