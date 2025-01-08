
import express from 'express';
import process from 'process';
import mongoose from 'mongoose';
import Todo from '../models/Todo.js'; // Path to your model

import dotenv from 'dotenv';
dotenv.config();

const app = express();
import cors from 'cors';

app.use(cors());
app.use(express.json()); // To parse JSON requests

mongoose.connect('mongodb://localhost:27017/todoDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Route to get all todos
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

// Route to add a new todo
app.post('/todos', async (req, res) => {
    const newTodo = new Todo({
        todo: req.body.todo,
        isCompleted: false,
    });
    await newTodo.save();
    res.json(newTodo);
});

// Route to update a todo
app.put('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedTodo);
});

// Route to delete a todo
app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.json({ message: 'Todo deleted' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
