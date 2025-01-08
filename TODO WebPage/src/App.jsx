
import { useEffect, useState } from 'react';
import Navbar from './Components/Navbar';
import { v4 as uuidv4 } from 'uuid'; // Unique ID generator
import { RiEdit2Fill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { RiCheckboxCircleFill } from "react-icons/ri";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]); // Array of todos
  const [showFinished, setShowFinished] = useState(true);
  const [circleColor, setCircleColor] = useState('black'); // Default color

  // Fetch todos from the backend on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/todos`);
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  // Add a new todo
  const handleAdd = async () => {
    if (!todo) return; // Prevent adding empty todos
    const newTodo = { id: uuidv4(), todo, isCompleted: false };

    try {
      const response = await fetch(`${apiUrl}/api/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });

      const addedTodo = await response.json();
      setTodos([...todos, addedTodo]);
      setTodo(""); // Clear input field
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  // Delete a todo
  const handleDelete = async (id) => {
    try {
      await fetch(`${apiUrl}/api/todos/${id}`, {
        method: 'DELETE',
      });
      setTodos(todos.filter(item => item.id !== id)); // Remove from state
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Edit a todo
  const handleEdit = async (id) => {
    const todoToEdit = todos.find(item => item.id === id);
    setTodo(todoToEdit.todo); // Set the todo to be edited
    await handleDelete(id); // Delete the todo being edited
  };

  // Toggle completion status of a todo
  const handleCheckbox = async (id) => {
    const todoToUpdate = todos.find(item => item.id === id);
    const updatedTodo = { ...todoToUpdate, isCompleted: !todoToUpdate.isCompleted };

    try {
      const response = await fetch(`${apiUrl}/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });

      const data = await response.json();
      setTodos(todos.map(item => (item.id === id ? data : item))); // Update the state
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  // Toggle showing finished todos
  const toggleFinished = () => {
    setShowFinished(!showFinished);
    setCircleColor(circleColor === 'black' ? 'white' : 'black'); // Change color of icon
  };

  const taskStatusText = showFinished ? 'Show Unfinished Tasks' : 'Show Finished Tasks';

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl bg-blue-400 p-5 min-h-[83vh] md:max-w-[75vw]">
        <div className="addTodo flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-center py-2">Manage Tasks</h2>
          <input onChange={handleChange} value={todo} className="py-2 px-2 mx-auto rounded-md w-4/5" type="text" />
          <button onClick={handleAdd} disabled={todo.length < 1} className="disabled:bg-cyan-700 bg-blue-900 hover:bg-blue-600 p-2 py-2 text-sm font-bold text-white rounded-md mx-auto w-3/4">
            Save
          </button>
        </div>
        <div className="flex align-center">
          <label className="flex items-center gap-1">
            <input onChange={toggleFinished} type="checkbox" style={{ display: "none" }} checked={showFinished} />
            <RiCheckboxCircleFill className="text-3xl" style={{ color: circleColor }} />
            <h3 className="my-4 md:text-xl font-bold ml-2">{taskStatusText}</h3>
          </label>
        </div>
        <div className="h-[2px] bg-black opacity-30 mx-auto my-1"></div>
        <h2 className="text-3xl font-bold">Your Tasks</h2>
        <div className="todos px-6">
          {todos.length === 0 && <div className="m-5">No Tasks Available</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && (
              <div key={item.id} className="todo flex md:w-2/3 my-3 justify-between">
                <div className="flex gap-5 md:text-lg">
                  <input onChange={() => handleCheckbox(item.id)} type="checkbox" checked={item.isCompleted} />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button onClick={() => handleEdit(item.id)} className="bg-blue-900 hover:bg-blue-600 p-2 py-2 text-white md:text-xl rounded-md mx-1">
                    <RiEdit2Fill />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="bg-blue-900 hover:bg-blue-600 p-2 py-2 text-white md:text-xl rounded-md mx-1">
                    <MdDeleteForever />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
