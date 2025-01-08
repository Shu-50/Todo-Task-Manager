import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    todo: String,
    isCompleted: Boolean,
});

const Todo = mongoose.model('Todo', todoSchema);
export default Todo;  // Use `export default` instead of `module.exports`
