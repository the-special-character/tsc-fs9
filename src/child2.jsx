import React, { PureComponent } from 'react';
// import shallowCompare from 'react-addons-shallow-compare';

class Child2 extends PureComponent {
  state = {
    count: 0,
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   return shallowCompare(this, nextProps, nextState);
  // }
  increment = () => {
    this.setState(({ count }) => ({
      count: count + 1,
    }));
  };

  decrement = () => {
    this.setState(({ count }) => ({
      count: count - 1,
    }));
  };

  render() {
    console.log('child 2 component');
    const { count } = this.state;

    if (count > 5) {
      throw new Error('something went wrong..');
    }

    return (
      <div>
        <h1>Child 2 component</h1>
        <button type="button" onClick={this.increment}>
          +
        </button>
        {count}
        <button type="button" onClick={this.decrement}>
          -
        </button>
      </div>
    );
  }
}

export default Child2;
