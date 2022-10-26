const express = require("express");
const mongoose = require('mongoose');
const bcript = require('bcrypt');
const User = require("../Model/user");
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post("/signup",(req,res,next)=>{
    bcript.hash(req.body.password,10,(err,hash)=>{
        if(err){
            res.status(500).json({
                error:err
            })
        }else{
            const registerUser = new User({
                _id:new mongoose.Types.ObjectId,
                username:req.body.username,
                password:hash,
                phone:req.body.phone
            })
            registerUser.save().then((result)=>{
                res.status(200).json({
                    message:"register User Successfully",
                    result:result
                })
            }).catch((err)=>{
                res.status(500).json({
                    error:err
                })
            })
        }
    })
})


router.post("/login",(req,res,next)=>{
    User.find({username:req.body.username})
    .exec()
    .then((user)=>{
        if(user.length < 1){
            return res.status(401).json({
                msg:"user does not exists"
            })
        }
        bcript.compare(req.body.password,user[0].password,(err,result)=>{
            if(!result){
                res.status(401).json({
                    msg:"Password matching Failed"
                })
            }
            if(result){
                const token = jwt.sign({
                    username:user[0].username,
                    phone:user[0].phone
                },
                'crud token',
                {
                    expiresIn:"24hours"
                }
                )
                res.status(200).json({
                    username:user[0].username,
                    phone:user[0].phone,
                    token:token
                })
            }
        })
    }).catch((err)=>{
        res.status(500).json({
            error:err
        })
    })
})


module.exports = router;