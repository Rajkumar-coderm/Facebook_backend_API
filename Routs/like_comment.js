const express = require('express');
const knex = require('../database/db')
const like = express();
like.use(express.json())
const { authenticateToken } = require('../auth/jwt')

like.post('/like', authenticateToken, (req, res) => {
    knex.select('*').from('post').then((data) => {
        const user = {
            user_id: req.data.id,
            post_id: data[0].id,
            like: req.body.like,
            comment: req.body.comment,
            share: req.body.share
        }
        if (req.body.like == true) {
            knex.select('*').from('like_comment').where('id', req.data.id).then((data1) => {
                if (data1.length < 1) {
                    knex('like_comment').insert(user).then((data) => {
                        knex.count('like').from('like_comment').where('user_id', req.data.id).then((data) => {
                            res.send({ your_like: data[0] })
                        }).catch((err) => {
                            res.send(err)
                        })
                    }).catch((err) => {
                        res.send({ message: "somthing went wrong..." })
                    })
                } else {
                    res.send({ message: "you already like this post...." })
                }
            })

        } else {
            knex('like_comment').insert(user).then((data) => {
                res.send({ message: "😇dislike post...." })
            }).catch((err) => {
                res.send({ message: "somthing went wrong..." })
            })
        }
    })
})

module.exports = like;