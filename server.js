const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const port = process.env.PORT || 4002;

app.use(express.json());
app.use(cors());

app.get('/', (request, response) => {
    response.send('<h1>Welcome to project2 service.</h1>');
});

app.post('/place', (request, response) => {
    let name = request.body.name;
    let address = request.body.address;
    let info = request.body.info;
    db.addPlace(name,address,info)
    .then(() => response.send(`The place ${name} was added successfully.`))
    .catch(e => response.status(500).send("There was an error in saving the palce"));
});

app.get('/places', (request, response) => {
    db.getPlaces()
    .then(places =>response.json(places))
    .catch(e => {console.log(e); response.status(500).send("There was an error in finding the places")});
});

app.post('/review/:placeName', (request, response) => {
    let placeName = request.params.placeName;
    let username = request.body.username;
    let comment = request.body.comment;
    db.addReview(username,comment,placeName)
    .then(() => response.send(`The review by ${username} for ${placeName} was added successfully.`))
    .catch(e => response.status(500).send("There was an error in adding the review."));
});

app.get('/search/:placeName/:location', (request, response) => {

});

app.get('/search', (request, response) => {
    db.searchPlaces()
    .then(places =>response.json(places))
    .catch(e => {console.log(e); response.status(500).send("There was an error in finding the palces")});
});

app.listen(port, () => console.log('Listening on port ' + port));