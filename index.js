const express=require("express")
const connection=require("./configs/db")
const {userRouter}=require("./route/user.Route")
const {postRouter}=require("./route/post.Route")
const {authentication}=require("./middleware/auth.middleware")

require("dotenv").config()
const cors=require("cors")
const app=express()
app.use(express.json())
const port=process.env.port|| 8080

app.use(cors())
app.get("/",(req,res)=>{
    res.send("Welcome to homepage of scocail media masai")
})


app.use(authentication)
app.use("/posts",postRouter)
app.listen(port,async()=>{
    try {
        await connection
        console.log("Connnection succesfully")
    } catch (error) {
      console.log(error)  
    }
    console.log("Running at port 8080")
})