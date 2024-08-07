
const express = require('express');
const app = express();

app.use(express.json());

app.listen(3000,()=>{
  console.log("server Started")
})

const connectDB = require('./config/database');
connectDB();

const user = require('./routes/user');
app.use('/api/v1',user);