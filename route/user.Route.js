const express=require("express")
const UserModel=require("../model/user.Model")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

require("dotenv").config()

const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    const {email,gender,name,password}=req.body
    try {
        bcrypt.hash(password,5,async(err,security)=>{
            if(err){
                console.log(err);
            }else{
                const user=new UserModel({email,gender,name,password:security})
                await user.save()
            }
        })
    } catch (error) {
        res.send({"message":"error in registering the user"})
        console.log(error.message);
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const hashpassword=user[0].password
        if(user.length>0){
            bcrypt.compare(password,hashpassword,(err,result)=>{
                if(result){
                    const token=jwt.sign({userID:user[0].id},process.env.key)
                    res.send({"messsage":"Login successful","token":token})
                }else{
                res.send({"messsage":"Wrong credentials"})
                }
            })
        }else{
            res.send({"messsage":"credentials are wrong"})
        }
    } catch (error) {
        res.send({"messsage":"somethinh went wrong"})
    }
})
module.exports={userRouter}