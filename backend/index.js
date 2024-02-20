const express = require('express');
const app = express();
const cors = require('cors');
const connectDataBase = require('./db');
require('dotenv').config();
const userRoute = require('./router/userRoute');
const port = process.env.PORT
connectDataBase();
app.use(express.json());
app.use(cors());


app.use("/api/", userRoute);


app.listen(port, () => {
    console.log(`server is running on localhost:${port}`)
})