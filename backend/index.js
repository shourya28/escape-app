const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const City = require('./db')

const app = express();

const password = require('./util/utility').password;
const pathDecider = require('./controllers/pathDecider')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(
    'mongodb+srv://shouryad28:' + password + '@cluster0.epyacwr.mongodb.net/city?retryWrites=true&w=majority'
)
    .then(() => {
        console.log('connected')
    })
    .catch(() => {
        console.log('Failure in connection')
    })

//Allowing CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

//General GET
app.get('/', (req, res, next) => {
    City.find()
        // .then(result => {
        //     let cityCodes = result.map(item => item.id)
        //     return cityCodes;
        // })
        .then(result => {
            res.status(201).send(result)
        })
})

//Specific GET
app.get('/:id', (req, res, next) => {
    var searchParam = req.params.id;
    for (let i = searchParam.length; i < 3; i++) searchParam += "."
    City.find({ id: { $regex: searchParam } })
        // .then(result => {
        //     let cityCodes = result.map(item => item.id)
        //     return cityCodes;
        // })
        .then(result => {
            res.status(201).send(result)
        })
})

//GET path of cities
app.get('/generatePath/:id', (req, res, next) => {
    const startCityId = req.params.id;
    let startCity;
    City.find({ 'id': startCityId })
        .then(async result => {
            const { citiesVisited, totalDistance } = await pathDecider.findShortestPath(result[0]);
            citiesVisited.push({ totalDistance: totalDistance })
            //res.setHeader('Content-Type', 'application/json')
            res.send(citiesVisited)
        })
})

app.listen(3000)