const express = require('express');
const cors = require('cors');
const server = express();
const mongoose = require("mongoose");
const Guitars = require("./model");
require('dotenv').config();


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => {
        console.log("Connected.")
    })
    .catch((error) => {
        console.log(error)
    })

server.use(express.json());
server.use(cors());

server.get('/guitars', (req, res) => {
    Guitars.find({})
        .then((guitars) => {
            res.json(guitars);
        })
        .catch((error) => {
            console.log(error);
        })
});

module.exports = server; 