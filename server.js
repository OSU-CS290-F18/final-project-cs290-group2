var express = require('express');
var exphbs = require('express-handlebars');

var MongoClient = require('mongodb').MongoClient;

var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB_NAME;
var db;

var mongoURL =
	'mongodb://' + mongoUser + ':' + mongoPassword + '@' +
	mongoHost + ':' + mongoPort + '/' + mongoDBName;


var app = express();
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
var port = process.env.PORT || 8080;

var fishPhotos = require('./pets/fishData');

var emuPhotos = require('./pets/emuData');

var iguanaPhotos = require('./pets/iguanaData');

var temp = require('./temp');
//var reviews = db.collection('reviews');
//var peopleCursor = collection.find({});

app.use(express.static('public'));

app.get('/content', function(req, res) {
    res.status(200).render('/content.html');
});

//Note that the paths for the pet pictures have pet name capitalized
app.get('/content/:pet', function (req, res, next){
    var petName = req.params.pet;
    var photoList;
    switch (petName) {
        case "Fish" :
            photoList = fishPhotos;
            break;
        case "Emus" :
            photoList = emuPhotos;
            break;
        case "Iguanas" :
            photoList = iguanaPhotos;
            break
    }
    if (photoList) {
        res.render('photographyPage', {
            photos: photoList,
            photoPageTitle: petName
        });
    } else {
        next();
    }
});

app.get('/reviews', function(req, res) {
    var reviewCollection = db.collection('reviews');
    reviewCollection.find({}).toArray(function (err, reviewDocs) {
        if (err) {
            res.status(500).send("Error connecting to DB.");
        }
        res.status(200).render('reviewPage', {
            review: reviewDocs
        });
    });
});

app.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log("== Server listening on port ", port);
});


MongoClient.connect(mongoURL, function (err, client) {
  if (err) {
    throw err;
  }
  db = mongoDBDatabase = client.db(mongoDBName);
  app.listen(3000, function () {
    console.log("== Server listening on port 3000");
  });
});