const express = require('express')
const knex = require("../database/db")
const {generateToken,authenticateToken} = require('../auth/jwt')
const router = express.Router()

router.post("/ld",authenticateToken,(req,res)=>{
    knex("likeDislike").insert(req.body).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})

router.put("/like/:id",authenticateToken,(req,res)=>{
    knex.select("*").from("likeDislike").where("id",req.params.id).update({"like":req.body.like,"dislike":false}).then((data)=>{
        res.send("like updated success")
        console.log("like updated success")
    }).catch((err)=>{
        res.send(err)
    })
})

router.put("/dislike/:id",authenticateToken,(req,res)=>{
    knex.select("*").from("likeDislike").where("id",req.params.id).update({
        Dislike:req.body.Dislike,
        like:false
    }).then((data)=>{
        res.send("dislike update success")
        console.log("dislike updated success")
    }).catch((err)=>{
        res.send(err)
    })
})



module.exports = router
