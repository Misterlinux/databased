const express = require("express");
var app = express();
const port = process.env.PORT || 5000
const bodyParser = require("body-parser");
const { request } = require("express");
const path = require('path')

const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'mrlzarate',
    port: 5432
});

app.use(express.static(path.join(__dirname, 'build')))

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'URLs to trust of allow');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if ('OPTIONS' == req.method) {
    res.sendStatus(200);
    } else {
      next();
    }
});

 
app.get('/', (req, res) => {
    console.log( "ok so, you welcome? ")

    res.send( "is it there?" );
})
  

app.get('/innit', function (req, res) {
    const oll = "kinda, but not really";
    console.log( "ok so, the thing is working")

    req.body = "oppure"

    pool.query('SELECT * FROM test', (error, result) => {
        res.json(result.rows[0]);
    });

})

 
app.listen(port, _ => {
    console.log(`server started on port ${port}`)
})