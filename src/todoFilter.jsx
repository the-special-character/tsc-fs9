import React, { memo } from 'react';

function TodoFilter({ filterTodo }) {
  console.log('filter todo');
  return (
    <section id="filterTodo" className="flex">
      <button type="button" className="btn rounded-none flex-1" onClick={() => filterTodo('all')}>
        All
      </button>
      <button
        type="button"
        className="btn rounded-none flex-1"
        onClick={() => filterTodo('pending')}
      >
        Pending
      </button>
      <button
        type="button"
        className="btn rounded-none flex-1"
        onClick={() => filterTodo('completed')}
      >
        Completed
      </button>
    </section>
  );
}

export default memo(TodoFilter);
