const express=require('express');
const knex=require('../database/db')
const log=express();
log.use(express.json())
const {generateAccessToken}=require('../auth/jwt')
log.post('/log',(req,res)=>{
    knex.select('*').from('user').where({"mobile":req.body.mobile}).then((data)=>{
        if(data[0].mobile===req.body.mobile){
            if(data[0].Password===req.body.Password){
                // res.send({mesage:'login successfully'})
                const token=generateAccessToken({"mobile":req.body.mobile,"id":data[0].id})
                console.log(token);
                res.cookie("token",token).send({mesage:'login successfully'})
            }
        }else{
            res.send({mesage:"increct"})
        }
    })
})


module.exports=log;