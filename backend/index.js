const express = require('express');
const app = express();
const cors = require('cors');
const connectDataBase = require('./db');
require('dotenv').config();
const userRoute = require('./router/userRoute');
const { verifyToken } = require('./utils/authService');
const { profile } = require('./controller/User.Controller');
const port = process.env.PORT
connectDataBase();
app.use(express.json());
app.use(cors());
//middleware 
const validateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    try {
        const decodedToken = verifyToken(token);
        if (!decodedToken) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        if (decodedToken.exp < Date.now() / 1000) {
            return res.status(401).json({ message: 'Unauthorized: Token expired' });
        }
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
}

app.use("/api", userRoute);
app.get('/api/profile', validateToken, profile)

app.listen(port, () => {
    console.log(`server is running on localhost:${port}`)
})