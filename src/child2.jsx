import React, { Component } from 'react';

export default class Child2 extends Component {
  state = {
    count: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  render() {
    const { count } = this.state;

    return (
      <div>
        <button
          type="button"
          onClick={() => {
            // this.setState({ count: 5 });
            this.setState(({ count }) => ({ count: count + 1 }));
          }}
        >
          +
        </button>
        <p>{count}</p>
        <button
          type="button"
          onClick={() => {
            this.setState(({ count }) => ({ count: count - 1 }));
          }}
        >
          -
        </button>
      </div>
    );
  }
}
