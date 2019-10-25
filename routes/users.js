var express = require('express');
var router = express.Router();


let mongoose = require('mongoose');
let User = require('../models/users');
let mongouri="mongodb+srv://Alaniskis:bibis159@reviewscluster-ybatl.mongodb.net/reviewsdb?retryWrites=true&w=majority";
mongoose.connect(mongouri);
let db = mongoose.connection;

db.on('error', function (err) {
  console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
  console.log('Successfully Connected to [ ' + db.name + ' ]');
});

router.findAll = (req, res) => {
  // Return a JSON representation of our list
  res.setHeader('Content-Type', 'application/json');

  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.send(JSON.stringify(users,null,5));
  });
}

function getByValue(array, id) {
  var result  = array.filter(function(obj){return obj.id == id;} );
  return result ? result[0] : null; // or undefined
}

router.findOne = (req, res) => {

  res.setHeader('Content-Type', 'application/json');

  User.find({ "_id" : req.params.id },function(err, user) {
    if (err)
      res.json({ message: 'User NOT Found!', errmsg : err } );
    else
      res.send(JSON.stringify(user,null,5));
  });
}

function getTotalPoints(array) {
  let totalVotes = 0;
  array.forEach(function(obj) { totalVotes += obj.userpoints; });
  return totalVotes;
}

router.addUser = (req, res) => {

  res.setHeader('Content-Type', 'application/json');

  var user = new User();

  user.user = req.body.user;
  user.address = req.body.address;
  user.gender = req.body.gender;

  user.save(function(err) {
    if (err)
      res.json({ message: 'User NOT Added!', errmsg : err } );
    else
      res.json({ message: 'User Successfully Added!', data: user });
  });
}

router.incrementUppoints = (req, res) => {

    User.findById(req.params.id, function(err,user) {
        if (err)
            res.json({ message: 'User NOT Found!', errmsg : err } );
        else {
            user.userpoints += 1;
            user.save(function (err) {
                if (err)
                    res.json({ message: 'User NOT UpVoted!', errmsg : err } );
                else
                    res.json({ message: 'User Successfully Upvoted!', data: user });
            });
        }
    });
}

router.deleteUser = (req, res) => {

  User.findByIdAndRemove(req.params.id, function(err) {
    if (err)
      res.json({ message: 'User NOT DELETED!', errmsg : err } );
    else
      res.json({ message: 'User Successfully Deleted!'});
  });
}

router.findTotalPoints = (req, res) => {

  User.find(function(err, users) {
    if (err)
      res.send(err);
    else
      res.json({ totalpoints : getTotalPoints(users) });
  });
}




module.exports = router;
