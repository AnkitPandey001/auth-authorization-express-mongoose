
const mongoose = require('mongoose')
require('dotenv').config();

const dbConnect =()=>{
    mongoose.connect(process.env.DATABASE_URl)
    .then(() => {
        console.log("databse connected")
    }).catch((err) => {
        console.log(err,"databse fetching error")
    });
}

module.exports = dbConnect;