/* eslint-disable react/state-in-constructor */
import './style.css';
import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';

document.body.innerHTML = '<div id="app"></div>';

export default class App extends Component {
  state = {
    todoText: '',
    todoList: [],
  };

  render() {
    const { todoText, todoList } = this.state;

    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            this.setState(({ todoText: a, todoList: b }) => ({
              todoList: [...a, b],
              todoText: '',
            }));
          }}
        >
          <input
            type="text"
            name="todo"
            id="todo"
            className="border"
            required
            value={todoText}
            onChange={(e) => {
              console.log(e.target.value);
              this.setState({ todoText: e.target.value });
            }}
          />
          <button type="submit">Add Todo</button>
        </form>

        {todoList.map((x) => (
          <p>{x}</p>
        ))}
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
