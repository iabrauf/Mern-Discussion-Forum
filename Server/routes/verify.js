const router = require("express").Router();
const {User} = require("../models/user.model");
const jwt = require('jsonwebtoken');
router.post("/",async(req,res)=>{
    // console.log(req.body);
    try {
          const user = await User.findOne({ _id: req.body.uid });
        //   console.log(user);
          if(user){
          const decode = jwt.verify(req.body.emailtoken, 'secret1234' );
        //   console.log(decode);
          await User.updateOne({ _id: req.body.uid},{verified: true});
          res.status(200).send({ status:'ok', message: "Email verified successfully" });
        }
        } catch (error) {
          res.status(500).send({ status: 'error'});
        }
  })
module.exports = router;