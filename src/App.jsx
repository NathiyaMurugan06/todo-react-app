import React, { useState } from 'react';
import TodoList from './components/TodoList';
import TodoFilters from './components/TodoFilters';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [task, setTask] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const addTodo = () => {
    if (!task.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: task.trim(),
      completed: false,
    };
    setTodos([newTodo, ...todos]);
    setTask('');
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div className={`wrapper ${darkMode ? 'dark' : ''}`}>
      <div className="app">
        <button className="toggle-theme" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
        <h2>📝 To-Do List</h2>
        <div className="input-box">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a new task..."
          />
          <button onClick={addTodo}>Add</button>
        </div>

        <TodoList
          todos={filteredTodos}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />

        <TodoFilters filter={filter} setFilter={setFilter} />

        <div className="progress">
          <div className="bar">
            <div
              className="fill"
              style={{ width: `${(completedCount / todos.length) * 100 || 0}%` }}
            ></div>
          </div>
          <p>
            Completed: {completedCount}/{todos.length}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
