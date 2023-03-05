const router = require("express").Router();
const { User } = require("../models/user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
router.post('/', async (req, res) => {
	    if(!req.body.email || !req.body.password){
		return res.json({ status: 'error', error: 'All field must be filled', user:false })
	    }
		const user = await User.findOne({
			email: req.body.email,
		})
		if (!user) {
			return res.json({ status: 'error', user: false })
		}
		if(!user.verified){
			return res.json({ status: 'error',error: "An Email sent to your account please verify to logged in", user:false });
		   }
		const isPasswordValid = await bcrypt.compare(
			req.body.password,
			user.password
		)
		if (isPasswordValid) {
			const token = jwt.sign(
				{
					_id:user._id,
					name: user.name,
					email: user.email,
				},
				'secret1234'
			)
			var uData ={
				_id:user._id,
				name:user.name,
                email:user.email
			}
			return res.json({ status: 'ok', token: token, user:uData })
		} else {
			return res.json({ status: 'error', user: false })
		}
	})
module.exports = router;
