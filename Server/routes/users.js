const router = require("express").Router();
const {User,validate} = require("../models/user.model");
const jwt = require('jsonwebtoken');
const emails = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
router.post('/', async (req, res) => {        
    	try {
			console.log(req.body);
			validate(req.body);
    		const existEmail = await User.findOne({email: req.body.email});
    		if(existEmail){
    			throw new Error('Email already exists');
    		}
    		const newPassword = await bcrypt.hash(req.body.password,10);
    		const user= await User.create({
    			name: req.body.name,
    			email: req.body.email,
    			password: newPassword,
    		})
			const emailtoken = jwt.sign(
				{
					email: user.email,
				},'secret1234',{expiresIn :'1h'});
			emails.verifyUserEmail(user._id,user.name,user.email,emailtoken);
			user.save();
			res.status(201).send({ status: 'ok',message: "An Email sent to your account please verify" });
    	} catch (error) {
    		res.status(400).json({error: error.message});
    	}
    })
module.exports = router;