// IMPORT PACKAGE
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require('fs')
const Movie = require('../models/movieModel')

dotenv.config({ path: "./config.env" });

// MONGOOSE
const DB = process.env.CONN_STR.replace(
  "<USERNAME>",
  process.env.DB_USERNAME,
).replace("<PASSWORD>", process.env.DB_PASSWORD);

mongoose.connect(DB)
.then((doc) => {
  console.log('Connection succeed !');
})
.catch((err) => {
  console.log('Connection failed !');
});

// IMPORT THE MOVIES DATA FROM data/movies.json
const movies = JSON.parse(fs.readFileSync('./data/movies.json', 'utf-8'))

// DELETE THE DATA FROM MONGODB COLLECTION
const deleteData = async () => {
    try{
        await Movie.deleteMany()
        console.log('Data deleted !')
    }catch(err) {
        console.log(`Error has occured: ${err}`)
    }
    process.exit()
}

// IMPORT DATA TO THE MONGODB COLLECTION
const importData = async () => {
    try{
        await Movie.create(movies)
        console.log('Data imported !')
    }catch(err) {
        console.log(`Error has occured: ${err}`)
    }
    process.exit()
}

if (process.argv[2] === '--delete') {
    deleteData()
}
else if (process.argv[2] === '--import') {
    importData()
}