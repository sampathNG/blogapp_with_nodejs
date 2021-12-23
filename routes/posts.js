const express = require('express');
const knex = require('../database/db')
const {generateToken,authenticateToken} = require('../auth/jwt')
const router = express.Router()



router.post("/post",authenticateToken,(req,res)=>{
    knex("posts").insert(req.body).then((data)=>{
        res.send("posts added")
    }).catch((err)=>{
        res.send(err)
    })
})
router.put("/upost/:id",authenticateToken,(req,res)=>{
    knex.select("*").from("posts").where("id",req.params.id).update(req.body).then((data)=>{
        res.send("post updated")
    }).catch((err)=>{
        res.send(err)
    })
})
router.delete("/dpost/:id",authenticateToken,(req,res)=>{
    knex.select("*").from("posts").where("id",req.params.id).del().then((data)=>{
        res.send("post deleted")
    }).catch((err)=>{
        res.send(err)
    })
})

router.get("/posts",authenticateToken,(req,res)=>{
    knex.select("*").from("posts").then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})

router.get("/posts/:id",authenticateToken,(req,res)=>{
    knex.select("*").from("posts").where("id",req.params.id).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        res.send(err)
    })
})


module.exports = router