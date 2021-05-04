require('dotenv').config();
const { Pool } = require('pg');

let host = process.env.host;
let database = process.env.database;
let port = process.env.port;
let username = process.env.mydbusername;
let password = process.env.password;


let connectionString =
`postgres://${username}:${password}@${host}:${port}/${database}`;

let connection = {
    connectionString: process.env.DATABASE_URL ? process.env.DATABASE_URL : connectionString,
    ssl : {rejectUnauthorized: false}
};

const pool = new Pool(connection);

// Methods for calls

// Add a place to the Database
let addPlace = (name, address, info) => {
    return pool.query('insert into mynearbyplaces.place(name,address,info) values ($1,$2,$3)',[name, address, info])
    .then(() => console.log(`The place ${name} was added to the Data Base.`))
    .catch(e => console.log(e));
}

// Get all of the places from the Database
let getPlaces = () => {
    let sql = `select * from mynearbyplaces.place`;
    return pool.query(sql)
    .then(result => result.rows);
}

// Add a review to the Database
let addReview = (username, comment, placename) => {
    return pool.query('insert into mynearbyplaces.review (username, comment, placename) values ($1,$2,$3)',[username, comment, placename])
    .then(() => console.log(`The review by ${username} was added to the Data Base.`))
    .catch(e => console.log(e));
}

let searchPlaces = (name,location) => {
    let sql = `select p.name, p.address, p.info,
    json_agg(json_build_object('username', r.username, 'comment', r.comment,)) as reviews
    from mynearbyplaces.places p left join mynearbyplaces.review r on p.name = r.placename`;
    return pool.query(sql)
    .then(result => result.rows);
}

module.exports = { addPlace, getPlaces, addReview, searchPlaces }