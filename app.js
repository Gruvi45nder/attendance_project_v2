const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const app = express();
dotenv.config(); // Initialize dotenv to use environment variables

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Generate the JWT
app.post('/user/generateToken', (req, res) => {
    const secret_key = process.env.SECRET_KEY || 'supersecret';
    const data = {
        time: new Date(),
        userID: 12 
    };

    const token = jwt.sign(data, secret_key);
    res.send(token);
});

// Validate the JWT
app.get('/user/validateToken', (req, res) => {
    const secret_key = process.env.SECRET_KEY || 'supersecret';
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).send('No token provided');
        }
        const token = authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'
        const verified = jwt.verify(token, secret_key);

        if (verified) {
            console.log(`JSON Web Token has been verified: ${JSON.stringify(verified)}`);
            res.send('Token is valid');
        } else {
            console.log(`User is not authorized: ${JSON.stringify(verified)}`);
            res.status(401).send('Invalid token');
        }
    } catch (error) {
        console.error('Error during token verification:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Connected to port ${PORT}`);
});