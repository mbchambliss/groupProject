'use strict';

const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key
const apiKey = "KAhRkGDUNpqGvR-P94ii7uH2K60Rt6GDk1msY6Yh_6DZNKxb0Q9aNNYoi-q0mos9zew6AZtMGIm6MrQFldYZ__TfeRqhJyHInCGuDGpuLIVIB5jQz6BW3gsH68nGWnYx";
const client = yelp.client(apiKey);

const searchRequest = {
  term:'food',
  location: 'Edgewater, Chicago, IL',
  price: '1'
};

client.search(searchRequest).then(response => {
  const firstResult = response.jsonBody.businesses[0];
  const prettyJson = JSON.stringify(firstResult, null, 4);
  console.log(prettyJson);
}).catch(e => {
  console.log(e);
});
