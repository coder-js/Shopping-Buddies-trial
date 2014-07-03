var express = require('express');
var app = express();
app.use("/", express.static('C:/Ionic Projects/shoppingBuddies-trial/www'));
app.listen(8100); 