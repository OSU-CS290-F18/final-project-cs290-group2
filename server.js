var express = require('express');
var exphbs = require('express-handlebars');
//var logger = require('./logger');

var app = express();
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
var port = process.env.PORT || 8080;

var fishPhotos = require('./pets/fishData');

var emuPhotos = [{
    photoURL: "https://images-na.ssl-images-amazon.com/images/I/51rV4Ur8SqL._SX355_.jpg",
    caption: "What a nice emu"
}];

var iguanaPhotos = [{
    photoURL: "https://images-na.ssl-images-amazon.com/images/I/51rV4Ur8SqL._SX355_.jpg",
    caption: "What a nice iguana"
}];

app.use(express.static('public'));


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
        case "Igunas" :
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

app.listen(port, function (err) {
    if (err) {
        throw err;
    }
    console.log("== Server listening on port ", port);
});

