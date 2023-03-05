const mongoose = require("mongoose");
const validator = require('validator');
//to avoid warning
mongoose.set('strictQuery', true);
const userSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	verified: { type: Boolean, default: false },
});
const User = mongoose.model("userData", userSchema);
  
//validating user
const validate = (data) => {
	if(!data.email || !data.password || !data.name){
		throw new Error('All field must be filled');
	}
	if(!validator.isEmail(data.email)){
		throw new Error('Please enter a valid email');
	}
	if(!validator.isStrongPassword(data.password)){
		throw new Error('Please use 8 digit strong password mix of letters (uppercase and lowercase), numbers, and symbols.');
	}
};

module.exports = { User, validate };