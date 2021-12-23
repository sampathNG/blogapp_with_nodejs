require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json())
const port = process.env.port
const signup = require("./routes/login_signup")
const post = require("./routes/posts")
const ld = require("./routes/like_dislike")
app.use("/",signup)
app.use("/",post)
app.use("/",ld)
app.get("/",(req,res)=>{
    res.send("server connecting")
})
app.listen(port,console.log(`running on port ${port}`))