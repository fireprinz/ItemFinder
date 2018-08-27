const request = require('request');
const apiKey = '';
var parsed = 0;

module.exports.findStores = function(dist,lat,long){
   return new Promise(function(resolve,reject){
    request('http://api.walmartlabs.com/v1/stores?format=json&lat=' + lat + '&lon=' + long + '&apiKey=' + apiKey, function(err, res, body) {
        if (err) {
            reject(err);
        } else {
              parsed = JSON.parse(body);
              for(var i = 0; i < parsed.length; i++){
                parsed[i].lat = parsed[i].coordinates[1];
                parsed[i].long = parsed[i].coordinates[2];
                parsed[i].storeName = "Walmart";
              }
              resolve(parsed);
        }
    });
  });
}
module.exports.getItems = function(search){
    return new Promise(function(resolve, reject) {
     // Do async job
        request('http://api.walmartlabs.com/v1/search?query=' + search + '&format=json&apiKey='+apiKey, function(err, res, body) {
            if (err) {
                reject(err);
            } else {
                parsed = JSON.parse(body);
                if(parsed.numItems === 0){
                  resolve({"storeName":"Walmart", "name":null, "price":null});
                }
                else{
                  var names = [];
                  var price = [];
                  var min = Math.min(5,parsed.numItems);
                  for(var i = 0; i < min; i++){
                    names.push(parsed.items[i].name);
                    price.push(parsed.items[i].salePrice);
                  }
                  resolve({"storeName":"Walmart", "name":names, "price":price})
                }
            }
        });
    });
};
