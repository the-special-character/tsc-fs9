import React, { memo } from 'react';

function TodoListItem({ toggleComplete, deleteTodo, x }) {
  console.log('todo list item');
  return (
    <section id="listItem1" className="flex items-center">
      <div>
        <label htmlFor="toggleComplete" className="sr-only">
          Toggle Complete
        </label>
        <input
          type="checkbox"
          name="toggleComplete"
          id="toggleComplete"
          checked={x.isDone}
          onChange={() => toggleComplete(x)}
        />
      </div>
      <p className={`flex-1 px-4 line-clamp-2 ${x.isDone ? 'line-through' : ''}`}>{x.text}</p>
      <button type="button" className="btn" onClick={() => deleteTodo(x)}>
        Delete
      </button>
    </section>
  );
}

export default memo(TodoListItem);
