const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');

const model = require("./models");
const models = model(process.env.MONGO_DB_URL ||"mongodb://localhost:27017/shoesData");

const shoeRoutes = require('./shoe.js');
const shoeRoute = shoeRoutes(models);

var app = express();

app.use(express.static('public'));
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json
app.use(bodyParser.json());

//app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(flash());



app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: 'hbs'
}));

app.set('view engine', 'hbs');

app.get("/api/shoes", shoeRoutes.shoesFun);
app.get("/api/shoes/brand/:brandname", shoeRoutes.findAllbrand);
app.get("/api/shoes/size/:size", shoeRoutes.sizeFun);
app.get("/api/shoes/brand/:brandname/size/:size", shoeRoutes.brandAndSize);
//app.post("/api/shoes/sold/:id", shoeRoutes);
// app.post("/api/shoes", shoeRoutes);
