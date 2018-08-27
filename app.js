const express = require('express');
const update = require('./update');

var app = express();
app.set('view engine', 'ejs');

update(app);

app.listen(3000);

console.log("You are listening to port 3000");
