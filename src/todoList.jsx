import React, { memo } from 'react';
import TodoListItem from './todoListItem';

function TodoList({ todoList, filterType, toggleComplete, deleteTodo }) {
  console.log('Todo List');
  return (
    <section id="todoList" className="flex flex-col gap-4 mx-2 flex-1">
      {todoList.map(x => {
        if (
          filterType === 'all' ||
          (filterType === 'pending' && x.isDone === false) ||
          (filterType === 'completed' && x.isDone === true)
        ) {
          return (
            <TodoListItem
              key={x.id}
              x={x}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          );
        }
        return null;
      })}
    </section>
  );
}

export default memo(TodoList);
