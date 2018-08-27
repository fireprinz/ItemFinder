const request = require('request');

const apiKey = '';

var parsed = 0;

module.exports.findStores = function(dist,lat,long){
   return new Promise(function(resolve,reject){
    request('https://api.bestbuy.com/v1/stores(area('+lat+',' + long + ',' + dist + '))?format=json&show=storeId,storeType,name,lat,lng&pageSize=100&apiKey=' + apiKey, function(err, res, body) {
        if (err) {
            reject(err);
        } else {
              var stores = JSON.parse(body).stores;
              for(var i = 0; i < parsed.length; i++){
                stores[i].storeName = "BestBuy";
              }
              resolve(stores);
        }
    });
  });
}

module.exports.getItems = function(search){
    return new Promise(function(resolve, reject) {
        newSearch = "(search=" + search.trim().replace(" ","&search=") + ")";
        request('https://api.bestbuy.com/v1/products' + newSearch + '?format=json&show=sku,name,salePrice&apiKey=' + apiKey, function(err, res, body) {
            if (err) {
                reject(err);
            } else {
                parsed = JSON.parse(body);
                //resolve(parsed);
                if(parsed.total === 0){
                  resolve({"storeName":"Best Buy", "name":null, "price":null});
                }
                else{
                  var names = [];
                  var price = [];
                  var min = Math.min(5,parsed.total);
                  for(var i = 0; i < min; i++){
                    names.push(parsed.products[i].name);
                    price.push(parsed.products[i].salePrice);
                  }
                  resolve({"storeName":"Best Buy", "name":names, "price":price});
                }
            }
        });
    });
};
