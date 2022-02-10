const express = require('express');
const cors = require('cors');
const server = express();

server.use(express.json());
server.use(cors());

server.get('/guitars', async (req, res) => {
    res
});

module.exports = server; 