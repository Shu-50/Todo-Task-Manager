import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'; // Load environment variables
import process from 'process';
// Load variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse JSON bodies

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

// Example route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Importing routes (Ensure your todoRoutes is correct)
import todoRoutes from './routes/todoRoutes.js';
app.use('/todos', todoRoutes);

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
