const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();

app.use(express.json());
var database;

app.get('/', (req, res) => {
    res.send('Welcome to the MongoDB API');
});

app.get('/api', (req, res) => {
    database.collection('users').find({}).toArray((error, result) => {
        if (error) throw error;
        res.send(result);
    });
});

const url = 'mongodb://localhost:27017';
const dbName = 'twigane';

MongoClient.connect(url, (error, result) => {
    if (error) throw error;
    console.log('Connected successfully to server');
    database = result.db(dbName);
    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
});
