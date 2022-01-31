const express = require('express');
const cors = require('cors');
const server = express();
const scraper = require('/scrapers');

server.use(express.json());
server.use(cors());

server.get('/guitars', async (req, res) => {
    res
});

server.get('/guitars/:name', async (req, res) => {
    const { name } = req.body.params;
     
})

module.exports = server; 