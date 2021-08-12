const express = require('express');
const knex = require('../database/db')
const routs = express();
routs.use(express.json())
const { authenticateToken } = require('../auth/jwt')

routs.post('/post', authenticateToken, (req, res) => {
    // console.log(req.data);
    const userpost = {
        user_id: req.data.id,
        Public: req.body.Public,
        Image: req.body.Image,
        Description: req.body.Description,
        tag: req.body.tag,
        location: req.body.location,
        Feeling: req.body.Feeling
    }
    knex('post').insert(userpost).then((data) => {
        res.send({ post: "successfully..." })
    }).catch((err) => {
        res.send({ message: "somthing went wrong...." })
    })
});

module.exports = routs;


