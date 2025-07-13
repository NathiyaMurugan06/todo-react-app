import React, { useState } from 'react';

const Todo = ({ todo, toggleComplete, deleteTodo, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleUpdate = () => {
    updateTodo(todo.id, editedText);
    setIsEditing(false);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
        />
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onBlur={handleUpdate}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleUpdate();
              if (e.key === 'Escape') {
                setEditedText(todo.text);
                setIsEditing(false);
              }
            }}
            autoFocus
          />
        ) : (
          <span onDoubleClick={() => setIsEditing(true)} className="todo-text">
            {todo.text}
          </span>
        )}
      </div>

      <div className="right">
        {todo.completed && <span className="checkmark">✅</span>}
        <button onClick={() => deleteTodo(todo.id)}>❌</button>
      </div>
    </div>
  );
};

export default Todo;
