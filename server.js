var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

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

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', function(req,res){
    res.status(200).render('homePage');
});

app.get('/content', function(req, res) {
    res.status(200).render('contentPage');
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

app.post('/reviews/addReview', function (req, res, next) {
    if (req.body && req.body.username && req.body.url && req.body.rating && req.body.year && req.body.text) {
        var peopleCollection = db.collection('reviews');
        peopleCollection.insertOne(
            {
                username: req.body.username,
                text: req.body.text,
                rating: req.body.rating,
                year: req.body.year,
                url: req.body.url

            },
            function (err, result) {
                if (err) {
                    res.status(500).send("Error saving review to DB");
                } else if (result) {
                    res.status(200).send("Success");
                } else {
                    next();
                }
            }
        );
    } else {
        res.status(400).send("Request needs all fields");
    }
});

app.get('/*', function(req, res){
    res.status(404).render('404', {
        title: req.url
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