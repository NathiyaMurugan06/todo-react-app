import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, toggleComplete, deleteTodo, updateTodo }) => {
  return (
    <div className="todo-list">
      {todos.length === 0 ? (
        <p className="empty">No tasks yet!</p>
      ) : (
        todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
