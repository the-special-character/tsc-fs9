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
    const input = this.inputRef.current;
    this.setState(
      ({ todoList: a }) => ({
        todoList: [...a, { id: new Date().valueOf(), text: input.value }],
      }),
      () => {
        input.value = '';
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

    console.log('render');

    return (
      <div className="flex flex-col">
        <h1 className="text-4xl font-semibold text-center my-6">Todo App</h1>

        <form onSubmit={this.addTodo} className="flex m-10">
          <input
            type="text"
            name="todo"
            id="todo"
            required
            ref={this.inputRef}
            className="px-2 w-full block rounded-l-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          <button
            type="submit"
            className="rounded-r-md min-w-24 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Todo
          </button>
        </form>

        {todoList.slice((page - 1) * 5, (page - 1) * 5 + 5).map((x) => (
          <div key={x.id} className="mx-10 my-4 flex items-center">
            <input type="checkbox" name="isDone" id="isDone" />
            <p className="flex-1 px-6">{x.text}</p>
            <button
              type="button"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Delete
            </button>
          </div>
        ))}

        <div className="flex gap-4 mx-10 justify-end">
          <button
            type="button"
            disabled={Math.ceil(todoList.length / visibleItem) <= page}
            onClick={this.setNextPage}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Next
          </button>
          <button
            type="button"
            disabled={page <= 1}
            onClick={this.setPrevPage}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Previous
          </button>
        </div>
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
