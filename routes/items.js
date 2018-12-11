var express = require('express');
var router = express.Router();

// Custom
var Item = require("../models/itemModule");

/* GET items listing. */
router.get('/', function(req, res, next) {
  Item.find({}, (err, items) => {
    if(err){
      console.log("Retrieving from db: " + err);
    }
    else{
      console.log(items);
    }
  });

  res.json(
    [
      {
        'id':'1',
        'title':'title1',
        'photo':'photo1'
      },
      {
        'id':'2',
        'title':'title2',
        'photo':'photo2'
      },
      {
        'id':'3',
        'title':'title3',
        'photo':'photo3'
      },
      {
        'id':'4',
        'title':'title4',
        'photo':'photo4'
      },
      {
        'id':'5',
        'title':'title5',
        'photo':'photo5'
      }
    ]
  );
});

/* POST item. */
router.post('/', function(req, res) {
  var title = req.body.title;
  var photo = req.body.photo;

  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('url', 'Photo is required').notEmpty();

  var errors = req.validationErrors();

  /*console.log(req.body);
  req.flash('info', 'Item "' + title + '" added.');
  res.redirect('/');*/

  if(errors){
    console.log(req.body);
    req.flash('info', 'Please enter values for all.');
    res.redirect('/');
  }
  else{
    let item = new Item({title:title, photo:photo});
    item.save(function(err){
        console.log("Error: " + err);
    });

    console.log(req.body);
    req.flash('info', 'Item "' + title + '" added.');
    res.redirect('/');
  }
});

module.exports = router;
