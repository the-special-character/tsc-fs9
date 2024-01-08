import React, { useState, useRef, useEffect, useContext } from 'react';
import { TodoContext } from './context/todoContext';
import TodoForm from './todoForm';
// import TodoForm from './todoForm';
// import TodoList from './todoList';
// import TodoFilter from './todoFilter';

function App() {
  const { isLoading, hasError } = useContext(TodoContext);

  console.log(hasError);

  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (hasError) {
    return <p>{hasError.message}</p>;
  }

  return (
    <main className="flex flex-col gap-4 min-h-screen">
      <h1 className="text-4xl font-bold text-center my-4">Todo App</h1>
      <TodoForm />

      {/* <TodoList
        todoList={todoList}
        filterType={filterType}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        state={errorList.filter(x => x.task === 'DELETE_TODO' || x.task === 'UPDATE_TODO')}
      />

      <TodoFilter filterTodo={loadTodo} /> */}
    </main>
  );
}

export default App;
