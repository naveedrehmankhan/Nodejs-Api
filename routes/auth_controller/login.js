const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { Validator } = require('node-input-validator');
const Users = require('../../model/users');


router.post('/',async function (req, res){
 
   try {
      const val = new Validator(req.body, {
          email: "required|email",
          password: "required",
        
      });
      const matched = await val.check();
      if (!matched) {
 
          return res.status(422).json({
              message: "please fill all feilds",
              status: 422,
              error: val.errors,
          })
      } else {

          const user = await Users.findOne({
              email: req.body.email,
          });
          if (user) {

            const validPass = await bcrypt.compare(req.body.password, user.password);
            if(validPass){
              var token = jwt.sign({user_details: user},process.env.JWT_KEY,{ expiresIn: 60 * 60 });

              return res.status(200).json({status: 200, "auth-token":token, message: "Login Successfull"});

            }else{
               return res.status(404).json({
                  status: 404,
                  message: "User Dosn't Exists",
              });
   
            }
          } else {

            return res.status(404).json({
               status: 404,
               message: "User Dosn't Exists",
           });

             
          }

      }

  } catch (error) {
      return res.status(404).json({
          status: 404,
          message: "internal error",
          error: error.message,
      });

  }

});


module.exports = router;
