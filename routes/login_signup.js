const express = require('express');
const knex = require('../database/db');
const {generateToken,authenicateToken, authenticateToken} = require('../auth/jwt')
const router = express.Router();
router.post('/signup',(req,res)=>{
    if(req.body.email===undefined || req.body.password===undefined ){
    res.send({"suggestion":"email and password both are require"})}
    else{
        knex.select("*").from("users").where({email:req.body.email}).then((data)=>{
            if(data.length<1){
                knex("users").insert({name:req.body.name,email:req.body.email,password:req.body.password}).then((data)=>{
                    res.send("signup succesfull")
                }).catch((err)=>{
                    res.send(err)
                })
            }else{
                res.send("users already exists")
            }
        })
    }
})

router.post("/login",(req,res)=>{
    if(req.body.email === undefined || req.body.password === undefined){
        res.send("both email and password are required")
    }else{
        knex.select("*").from("users").where('email',req.body.email).then((data)=>{
            const password =req.body.password
            if(password){
                const token = generateToken(req.body)
                res.send(data)
                console.log(token)
            }else{
                res.send("invalid password")
            }
        }).catch((err)=>{
            res.send(err)
        })
    }
})


router.put("/uuser/:id",authenticateToken,(req,res)=>{
    knex.select("*").from("users").where("id",req.params.id).update(req.body).then((data)=>{
        res.send("user details updated")
    }).catch((err)=>{
        res.send(err)
    })
})

router.delete("/duser/:id",authenticateToken,(req,res)=>{
    knex.select("*").from("users").where("id",req.params.id).del().then((data)=>{
        res.send("user deleted")
    }).catch((err)=>{
        res.send(err)
    })
})

module.exports = router

