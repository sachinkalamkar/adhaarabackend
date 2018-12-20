var path = require("path");
var cors=require("cors")
var express = require('express');
var bodyParser = require("body-parser");

const router = express.Router();
var app = express();
var http = require('http')

app.use(cors());
const port = 4003;
app.use(bodyParser.json());

require('./route')(router);
app.use('/', router);

app.listen(port, () => {
 console.log("Server listening on port " + port);
});





