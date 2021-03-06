const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');

const model = require("./models");
const models = model(process.env.MONGO_DB_URL ||"mongodb://localhost:27017/shoesData");

const shoeRoutes = require('./shoe.js');
const shoeRoute = shoeRoutes(models);

 // const  ObjectId = require('mongodb').ObjectId

var app = express();

app.use(express.static('public'));
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
 //parse application/json
app.use(bodyParser.json());

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(flash());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: 'hbs'
}));

app.set('view engine', 'hbs');

// List all shoes in stock
app.get("/api/shoes", shoeRoute.findAllshoes);

// List all shoes for a given brand
app.get("/api/shoes/brand/:brandname", shoeRoute.findBrand);

// List all shoes for a given size
app.get("/api/shoes/size/:size", shoeRoute.sizeFun);

// List all shoes for a given brand and size
app.get("/api/shoes/brand/:brandname/size/:size", shoeRoute.brandAndSize);

// Update the stock levels when a shoe is sold
  app.post("/api/shoes/sold/:id", shoeRoute.soldShoes);

// Add a new new shoe to his stock.
app.post("/api/shoes", shoeRoute.shoesFun);

//handling brand duplicates
app.get("/api/shoes/allBrands", shoeRoute.brandDupl);

//handling brands duplicates
app.get("/api/shoes/allSize", shoeRoute.sizeDupl);




//starting the sarver
var server = app.listen(process.env.PORT || 3001, function(){

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});
