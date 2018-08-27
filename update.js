const walmart = require('./walmart');
const bestbuy = require('./bestbuy');


module.exports = function(app){

  app.get('/', function(req,res){
    if(req.query.item !== undefined){
      var promises = [];
      promises.push(bestbuy.getItems(req.query.item));
      promises.push(walmart.getItems(req.query.item));
      handlePromises(promises,res);
    }
    else{

      res.render('front.ejs', {myStores:null});
    }
  });
}

var handlePromises = function(promise,res){
  var stores = [];
  var tot = Math.min(promise.length,10);
  for(var i = 0; i < tot; i++){
    promise[i].then(function(result) {
      stores.push(result);
      if(stores.length === tot){
        res.render('front.ejs', {myStores:stores});
      }
    }, function(err) {
      console.log(err);
    });
  }
}
