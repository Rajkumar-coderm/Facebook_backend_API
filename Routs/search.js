const express = require('express');
const knex = require('../database/db')
const search = express()
search.use(express.json());
// http://localhost:2022/facebook/search?search_data=Rajkumar     use this link

search.get('/facebook/search', (req, res) => {
    const search = req.query.search_data
    knex.select('name', 'surname').from('user').where('name', 'like', '%' + search + '%')
        .orWhere('surname', 'like', '%' + search + '%').then((data) => {
            res.send(data)
        }).catch((err) => {
            res.send(err)
        })
})

search.get('/search/all', (req, res) => {
    knex.select('*').from('user').then((data) => {
        res.send(data)
    })
})
module.exports = search;