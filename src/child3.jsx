import React, { PureComponent } from 'react';
// import shallowCompare from 'react-addons-shallow-compare';

class Child3 extends PureComponent {
  state = {};

  // shouldComponentUpdate(nextProps, nextState) {
  //   return shallowCompare(this, nextProps, nextState);
  // }

  render() {
    console.log('child 3 component');
    return (
      <div>
        <h1>Child 3 component</h1>
      </div>
    );
  }
}

export default Child3;
