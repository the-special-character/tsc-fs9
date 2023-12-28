import React, { PureComponent, memo } from 'react';
import PropTypes from 'prop-types';
import TodoListItem from './todoListItem';

class TodoList extends PureComponent {
  state = {
    error: null,
  };

  // static getDerivedStateFromError(error) {
  //   return {
  //     error,
  //   };
  // }

  render() {
    const { todoList, toggleComplete, deleteTodo, state } = this.props;
    const { error } = this.state;
    return (
      <section id="todoList" className="flex flex-col gap-4 mx-2 flex-1">
        {/* {!!error && <h1>{error.message}</h1>} */}
        {error ? (
          <h1>{error.message}</h1>
        ) : (
          todoList.map(x => (
            <TodoListItem
              key={x.id}
              x={x}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
              state={state.find(y => y.id === x.id)}
            />
          ))
        )}
      </section>
    );
  }
}

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      isDone: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  state: PropTypes.arrayOf(
    PropTypes.shape({
      task: PropTypes.string.isRequired,
      stattus: PropTypes.oneOf(['LOADING', 'ERROR']).isRequired,
      message: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default memo(TodoList);
