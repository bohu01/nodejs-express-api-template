
/*
 * user controller.
 */
var User = require('../models/user.js');
var fs = require('fs');
var path= require('path');
var async = require("async");
var uuid = require('node-uuid');

exports.create = function (req, res) {
  var role;
  var user = new User(req.body);
  console.log(req.body)
  if(req.body.role=="0"){
    var role = new Client();
    user.isClient = true;
  }
  else if (req.body.role=="2"){
    var role = new Support();
    user.isSupport = true;
  }
  
  user.provider = 'local'
  User.find({username: req.body.username}, function(err,users){
    if(users.length == 0){
      user.save(function (err) {
        role.user_id = user.id;
        console.log(role.user_id)
        role.save(function(err){
          res.json({message: "success"})
        })
      })
    }
    else{
      res.json(409, {message: "username already exit"})
    }
  })
};

exports.login = function(req, res){
	res.json(200, {message:"Login successful", user:req.user})
}

exports.loginfail = function(req, res){
  res.json(401, {message:"loginfail"})
}

exports.test = function(req, res){
  console.log(req.body)
  res.json({message:"ok"})
}

exports.getInfo = function(req, res){
  if(req.isAuthenticated()){
    var role;
    if(req.user.isClient){
      role = Client
    }
    if(req.user.isDoctor){
      role = Doctor
    }
    if(req.user.isSupport){
      role = Support
    }
    role.findOne({user_id: req.user.id}, function(err,info){
      if(err){
        console.log(err)
      }
      res.json({profile: info})
    })
  }
  else{
    res.json(401, {message:"please log in"})
  }
}

exports.updateInfo =function(req,res){
  if(req.isAuthenticated()){
    var role;
    if(req.user.isClient){
      role = Client
    }
    if(req.user.isDoctor){
      role = Doctor
    }
    role.findOne({user_id: req.user.id}, function(err,info){
      if(err){
        console.log(err)
      }
      info.dob_year = req.body.dob_year;
      info.dob_month = req.body.dob_month;
      info.dob_day = req.body.dob_day;
      info.gender = req.body.gender;
      info.address_street = req.body.address_street;
      info.address_city = req.body.address_city;
      info.address_state = req.body.address_state;
      info.zipcode = req.body.zipcode;
      info.nation = req.body.nation;
      info.save(function(err){
        res.json({message:"update profile success"})
      })
    })
  }
  else{
    res.json(401, {message:"please log in"})
  }  
}



exports.uploadProfilePhoto = function(req, res){
  if(req.isAuthenticated()){
    var role;
    if(req.user.isClient){
      role = Client
    }
    role.findOne({user_id: req.user.id}, function(err,info){
      if(err){
        console.log(err)
      }
      info.photo_path = req.body.avatar_url;
      info.save(function(err){
        res.json({message:"upload profile photo success"})
      })
    })
  }
  else{
    res.json(401, {message:"please log in"})
  }
}

