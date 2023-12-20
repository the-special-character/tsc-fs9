import React, { forwardRef, memo } from 'react';

function TodoForm({ addTodo }, ref) {
  console.log('Todo Form');
  return (
    <form className="flex justify-center mx-2" onSubmit={addTodo}>
      <div>
        <label htmlFor="todoText" className="sr-only">
          Todo Text
        </label>
        <input ref={ref} type="text" id="todoText" className="rounded-l-md" required />
      </div>
      <button
        type="submit"
        className="rounded-r-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        <span className="line-clamp-1">Add Todo</span>
      </button>
    </form>
  );
}

export default memo(forwardRef(TodoForm));
