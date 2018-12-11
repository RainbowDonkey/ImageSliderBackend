var express = require('express');
var router = express.Router();

// Custom
//var Item = require("../models/itemModule");
var db;

/* GET items listing. */
router.get('/', function(req, res, next) {
  db.database.collection('item').find({}).toArray((err, docs) => {
    if(err){
      console.log("error: " + err);
      res.json([]);
    }
    else{
      console.log(docs);
      res.json(docs);
    }
  });
});

/* POST item. */
router.post('/', function(req, res) {
  var title = req.body.title;
  var photo = req.body.url;

  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('url', 'Photo is required').notEmpty();

  var errors = req.validationErrors();

  if(errors){
    console.log(req.body);
    req.flash('info', 'Please enter values for all.');
    res.redirect('/');
  }
  else{
    db.database.collection('item').save({description:title, photo:photo}, function(err){
      if(err){
        console.log("Error in save.");
        req.flash('info', 'Error adding item.');
        res.redirect('/');
      }
      else{
        console.log("Saved successfully");
        console.log(req.body);
        req.flash('info', 'Item "' + title + '" added.');
        res.redirect('/');
      }
    });
  }
});

function setDatabase(database){
  console.log("Database ref recieved in api.");
  db = database;
}

module.exports = router;
module.exports.setDatabase = setDatabase;
