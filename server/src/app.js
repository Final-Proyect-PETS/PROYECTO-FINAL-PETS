const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const errorHandler = require('./utils/middlewares/errorHandler');
const setHeaders = require('./utils/middlewares/setHeaders');
const routes = require('./routes/index.js'); //todos los router ahora son routes

require('./db.js'); //esta linea me conecta con DB

const server = express();

server.name = 'PF HAPPPY TAILS API';

server.use(express.urlencoded({extended:false}));
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(express.static(path.join(__dirname, 'public')))
server.use(cookieParser());
server.use(morgan('dev'));
server.use(setHeaders);


server.use('/', routes);

// Error catching endware.
server.use(errorHandler);

module.exports = server;
