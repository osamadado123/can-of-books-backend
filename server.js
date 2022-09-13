'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());

const PORT = process.env.PORT || 3010;

server.get('/', homeHandler);
server.get('/test', testHandler);
server.get('*', defaultHandler)


function homeHandler(req,res){

  res.send("Hi from the home route");
}

function testHandler(req,res){

  res.send("Hi from the test route");
}
  
function defaultHandler (req,res){

  res.status(404).send("Sorry page not found")
}

server.listen(PORT, () => console.log(`listening on ${PORT}`));
