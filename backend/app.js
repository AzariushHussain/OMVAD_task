require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const connectMongoDb = require('./db');
const routes = require('./routes/index');

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Fallback to localhost if FRONTEND_URL is not set
    credentials: true
}));
app.use(express.json());

(async () => {
    try {
        await connectMongoDb.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); 
    }
})();

app.use('', routes);
app.get('/health', (req, res) => {
    res.status(200).json({ message: 'Server is working' });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
});