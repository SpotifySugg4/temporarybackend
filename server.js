const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const UsersRouter = require('./users/usersRouter.js')
const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json())
server.use('/users', UsersRouter);

server.get('/', (req, res) => { 
    res.status(200).json({
        api: "API IS ONLINE"
    })
})

module.exports = server;