const express = require('express');
const knex = require('../database/db')
const sin = express();
sin.use(express.json())

sin.post('/sin', (req, res) => {
    if (req.body.name === undefined || req.body.surname === undefined || req.body.mobile === undefined) {
        res.send({ message: "please fill all the data..." })
    } else {
        knex.select('*').from('user').where({ "mobile": req.body.mobile }).then((data1) => {
            if (data1.length < 1) {
                knex('user').insert(req.body).then((data) => {
                    res.send({ sinup: "successfully.." })
                }).catch((err) => {
                    res.send(err)
                })
            } else {
                res.send({ message: "user already exit" })
            }
        }).catch((err) => {
            res.send(err)
        })
    }
})

module.exports = sin;