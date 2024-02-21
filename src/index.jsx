/* eslint-disable react/state-in-constructor */
import './style.css';
import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';

document.body.innerHTML = '<div id="app"></div>';

export default class App extends Component {
  state = {
    count: 0,
  };

  render() {
    const { count: data } = this.state;

    return (
      <div>
        <button
          type="button"
          onClick={() => {
            this.setState(({ count }) => ({
              count: count + 1,
            }));
          }}
        >
          +
        </button>
        <p>{data}</p>
        <button
          type="button"
          disabled={data <= 0}
          onClick={() => {
            this.setState(({ count }) => ({
              count: count - 1,
            }));
          }}
        >
          -
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
