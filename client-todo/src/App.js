import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [newtodo, setNewtodo] = useState('');
  const [edittodo, setEdittodo] = useState(null);
  const [edittext, setEdittext] = useState('');

  useEffect(() => {
    const fetchTodo = async () => {
      const response = await axios.get('http://localhost:5000/api/todos');
      setTodos(response.data);
      console.log(response.data);
    };
    fetchTodo();
  }, []);

  const handleAddData = async () => {
    if (newtodo.trim() !== '') {
      const response = await axios.post('http://localhost:5000/api/todos', { text: newtodo });
      setTodos([...todos, response.data]);
      setNewtodo('');
    }
  };

  const handleEditData = (todo) => {
    console.log('Editing:', todo);
    setEdittodo(todo._id);
    setEdittext(todo.text);
  };

  const handleUpdateData = async () => {
    if (edittext.trim() !== '') {
      console.log('Updating:', edittodo, edittext);
      const response = await axios.put(`http://localhost:5000/api/todos/${edittodo}`, { text: edittext });
      console.log('Update response:', response.data);
      setTodos(todos.map(todo => (todo._id === edittodo ? response.data : todo)));
      setEdittodo(null);
      setEdittext('');
    }
  };

  const handleDeleteData = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    setTodos(todos.filter(todo => todo._id !== id));
  };

const handleToggleData= async (id) =>{
 const updatedTodo= todos.map(todo =>{
  if(todo._id===id){
    return{...todo, completed:!todo.completed}
  } 
  return todo
  });
  setTodos(updatedTodo)
}



  return (
    <div className="App">
     
      <h1>TO-DO-LIST</h1>
      
      <input
        type='text'
        placeholder='please write your to-do-list'
        value={newtodo}
        onChange={(e) => setNewtodo(e.target.value)}
      />
      <button onClick={handleAddData}>please add your todo</button>
      <ul>
        {todos.length > 0 ? (
          todos.map(todo => (
            <li key={todo._id} style={{backgroundColor: todo.completed? 'lightgreen':'white'}}>
           
              <span className="todo-text" 
              style={{textDecoration:todo.completed?'line-through':'none'} } 
              onClick={()=>handleToggleData(todo._id)}>
                {todo.text}
                </span>
              <button onClick={() => handleDeleteData(todo._id)}>Delete To-Do</button>
              <button onClick={() => handleEditData(todo)}>Edit To-Do</button>
            </li>
          ))
        ) : (
          <p>Loading todos...</p>
        )}
      </ul>

      {edittodo && (
        <div className="edit-container">
          <input
            type='text'
            placeholder='Edit your to-do'
            value={edittext}
            onChange={(e) => setEdittext(e.target.value)}
          />
          <button onClick={handleUpdateData}>Update To-Do</button>
        </div>
      )}
    </div>
  );
}

export default App;