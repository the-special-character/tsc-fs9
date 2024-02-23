/* eslint-disable react/state-in-constructor */
import './style.css';
import React, { Component, createRef } from 'react';
import { createRoot } from 'react-dom/client';

document.body.innerHTML = '<div id="app"></div>';

const visibleItem = 5;

export default class App extends Component {
  inputRef = createRef();

  state = {
    todoList: [],
    page: 1,
  };

  addTodo = (e) => {
    e.preventDefault();
    this.setState(
      ({ todoList: a }) => ({
        todoList: [...a, this.inputRef.current.value],
      }),
      () => {
        this.inputRef.current.value = '';
      },
    );
  };

  setNextPage = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  setPrevPage = () => {
    this.setState(({ page }) => ({
      page: page - 1,
    }));
  };

  render() {
    const { todoList, page } = this.state;

    return (
      <div>
        <form onSubmit={this.addTodo}>
          <input
            type="text"
            name="todo"
            id="todo"
            className="border"
            required
            ref={this.inputRef}
          />
          <button type="submit">Add Todo</button>
        </form>

        {todoList.slice((page - 1) * 5, (page - 1) * 5 + 5).map((x) => (
          <p>{x}</p>
        ))}
        <button
          type="button"
          disabled={Math.ceil(todoList.length / visibleItem) <= page}
          onClick={this.setNextPage}
        >
          Next
        </button>
        <button type="button" disabled={page <= 1} onClick={this.setPrevPage}>
          Previous
        </button>
      </div>
    );
  }
}

// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(
  <div>
    <App msg="Helllo From props" />
    {/* const app = new App({ msg: "hello from props"}) */}
  </div>,
);
