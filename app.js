const express = require("express")
const app = express()
const mustache = require("mustache-express")
const bodyParser = require("body-parser")
const session = require("express-session")
const lowercase = require("express-lowercase-paths")
const expressValidator = require("express-validator")
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bikes = require('./models/Bike')
const MONGO_URL = "mongodb://127.0.0.1:27017/bikes"
mongoose.connect(MONGO_URL);
app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: false
}))

var sess = {
  secret: "robsite",
  cookie: {},
  saveUninitialized: true,
  resave: true
}
app.use(session(sess))
app.use(lowercase())
app.use(expressValidator())
// END OF PACKAGE CALLS AND USES


// GET FUNCTION FOR MONGOOSE
app.get("/", function(req, res) {
  bikes.find().then(function(bikes) {
    res.render("index", {
      bikes: bikes
    })
  })
})

app.get("/bikes/new", function(req, res) {
  res.render('new', {});
});

app.post("/bikes", function(req, res) {
  const model = req.body.model
  const wheelSize = req.body.wheelSize
  const bike = new bikes()
  bike.model = model
  bike.wheelSize = wheelSize
  bike
    .save()
    .then(function(bike) {
      res.redirect("/")
    })
    .catch(function(error) {
      console.log("error", error)
      res.render("new", {
        bikes: bikes,
        errors: error.errors
      })
    })
})

app.post("/bikes/:id", function(req, res) {
  bikes.findOne({
    _id: req.params.id
  }).then(function(bikes) {
    const model = req.body.model
    const wheelSize = req.body.wheelSize
    bike.model = model
    bike.wheelSize = wheelSize
    bike
      .save()
      .then(function(bikes) {
        res.redirect("/")
      })
      .catch(function(error) {
        res.render("edit", {
          bikes: bikes,
          errors: error.errors
        })
      })
  })
})

app.get("/bikes/:id", function(req, res) {
  bikes.findOne({
    _id: req.params.id
  }).then(function(bike) {
    res.render("detail", {
      bike: bike
    })
  })
})

app.get("/bikes/:id/edit", function(req, res) {
  bikes.findOne({
    _id: req.params.id
  }).then(function(bike) {
    res.render("edit", {
      bike: bike
    })
  })
})

app.get("/bikes/:id/delete", function(req, res) {
  bikes.deleteOne({
    _id: req.params.id
  }).then(function() {
    res.redirect("/")
  })
})

// HOST MODE FOR ADDRESS 0.0.0.0:3000
app.listen(3000, function() {
  console.log("Express started on port 3000")
})
