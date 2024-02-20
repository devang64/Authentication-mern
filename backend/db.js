const mongoose = require("mongoose");
require('dotenv').config();
const url = process.env.DB_URL;

const connectDataBase = () => {

    mongoose.connect(url).then((data) => {
        console.log("Mongo Connection successfull!!")
    }).catch((err) => {
        // console.log(err)
    })
}

module.exports = connectDataBase;