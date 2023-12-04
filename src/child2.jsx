// import React from 'react';

import React, { Component } from 'react';

// function Child2() {
//   return <div>child2</div>;
// }

// export default Child2;

// let count = 0;

class Child2 extends Component {
  state = {
    count: 0,
  };

  render() {
    console.log('child2 render');
    return (
      <div>
        <button
          type="button"
          onClick={() => {
            // this.state.count += 1;
            this.setState({ count: 5 });
          }}
        >
          +
        </button>
        <p>{this.state.count}</p>
        <button
          type="button"
          onClick={() => {
            this.setState({ count: -8 });
          }}
        >
          -
        </button>
      </div>
    );
  }
}

export default Child2;
