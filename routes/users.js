"use strict;"


let express = require('express');
let User = require('../models/user');

let router = express.Router();



router.post('/register', (req, res) => {
	// Register a new user

	User.register(req.body, err => {
		res.status(err ? 400 : 200).send(err);
	});
});


router.post('/login', (req, res) => {
	// Authenticate a returning user

	User.authenticate(req.body, (err, user) => {
		console.log('err:', err);
		if(err) return res.status(400).send(err);

		let token = user.generateToken();

		res.cookie('authtoken', token).send(user);
	});
});

router.post('/logout', (req, res) => {
	res.clearCookie('authtoken').send();
});



router.get('/portfolio', User.authMiddleware, (req, res) => {
	console.log('user',req.user);
	res.send(req.user);
});



router.put('/save/:symbol', User.authMiddleware, (req,res) =>{
	User.findOneAndUpdate({username: req.user.username},{$push:{portfolio: req.params.symbol}}, err =>{
		res.status(err? 400:200).send(err);
	});
});

router.put('/remove/:symbol', User.authMiddleware, (req,res) =>{
	User.findOneAndUpdate({username: req.user.username},{$pull:{portfolio: req.params.symbol}}, err =>{
		res.status(err? 400:200).send(err);
	});
});





















router.route('/')
.get(function(req,res){
	User.find({}, (err,users) => {
		res.status(err? 400:200).send(err || users);
	});
})
.post(function(req,res){
	let user = new User(req.body);
	user.save((err,savedUser) => {
		res.status(err? 400:200).send(err || savedUser);
	});
});


router.route('/:id')
.get(function(req,res){
	User.find({_id:req.params.id}, (err,user) => {
		res.status((err || !user)? 400:200).send(err || user[0]);
	});
})
.put(function(req,res){
	User.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,savedUser) => {
		res.status(err? 400:200).send(err || savedUser);
	});
})
.delete(function(req,res){
	User.findByIdAndRemove(req.params.id, err => {
		res.status(err? 400:200).send(err);
	});
});


module.exports = router;

