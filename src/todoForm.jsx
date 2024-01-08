import React, { memo, useContext } from 'react';
import { TodoContext } from './context/todoContext';

function TodoForm() {
  const { addTodo, inputRef, isAdding } = useContext(TodoContext);

  return (
    <form className="flex justify-center mx-2" onSubmit={addTodo} noValidate>
      <div>
        <label htmlFor="todoText" className="sr-only">
          Todo Text
        </label>
        <input ref={inputRef} type="text" id="todoText" className="rounded-l-md" required />
      </div>
      <button
        type="submit"
        disabled={isAdding}
        className="rounded-r-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-zinc-400 disabled:cursor-wait"
      >
        <span className="line-clamp-1">Add Todo</span>
      </button>
    </form>
  );
}

TodoForm.propTypes = {
  // addTodo: PropTypes.func.isRequired,
  // state: PropTypes.shape({
  //   task: PropTypes.string.isRequired,
  //   stattus: PropTypes.oneOf(['LOADING', 'ERROR']).isRequired,
  //   message: PropTypes.string.isRequired,
  // }).isRequired,
};

export default memo(TodoForm);
