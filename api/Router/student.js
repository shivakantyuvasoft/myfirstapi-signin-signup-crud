const express = require("express");
const mongoose = require("mongoose");

const Router = express.Router();
const Student = require("../Model/studentSchema")
const checkAuth = require("../Middleware/checkAuth");

// if use authenticate route use middleware for authorization like this
// Router.get("/",checkAuth,(req,res,next)=>{
// in every Route in curd
 
Router.get("/",(req,res,next)=>{
    Student.find().exec()
    .then((result)=>{
        res.status(200).json({
            allStudent : result
        })
    }).catch((err)=>{
        res.status(500).json({
            error:err
        })
    })
})


Router.get("/:id",(req,res,next)=>{
    Student.findById({_id:req.params.id}).then((result)=>{
        res.status(200).json({
            allStudent : result
        })
    }).catch((err)=>{
        res.status(500).json({
            error:err
        })
    })
})

Router.delete("/:id",(req,res,next)=>{
    Student.deleteOne({_id:req.params.id}).then((result)=>{
        res.status(200).json({
            message:"user remove successfully",
            allStudent : result
        })
    }).catch((err)=>{
        res.status(500).json({
            error:err
        })
    })
})


Router.put("/:id",(req,res,next)=>{
    Student.findOneAndUpdate({_id:req.params.id},{
        $set:{
            name:req.body.name,
            age:req.body.age,
            school:req.body.school
        }
    }).then((result)=>{
        res.status(200).json({
            message:"update successfully",
            result:result
        })
    }).catch((err)=>{
        res.status(500).json({
            error:err
        })
    })
})


Router.post("/",(req,res,next)=>{
    const student = new Student({
        _id:new mongoose.Types.ObjectId,
        name:req.body.name,
        age:req.body.age,
        school:req.body.school
    });
    student.save().then((result)=>{
        res.status(200).json({
            newStudent:result
        })
    }).catch((err)=>{
        res.status(500).json({
            error:err
        })
    })
})

module.exports = Router;