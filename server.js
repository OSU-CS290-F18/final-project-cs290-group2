var express = require('express');
//var exphbs = require('express-handlebars');
//var logger = require('./logger');

var app = express();

var port = process.env.PORT || 8080;

app.use(express.static('public'));

app.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log("== Server listening on port ", port);
});

