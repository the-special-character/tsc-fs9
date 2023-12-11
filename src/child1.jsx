import React, { PureComponent } from 'react';
// import shallowCompare from 'react-addons-shallow-compare';

class Child1 extends PureComponent {
  state = {};

  constructor(props) {
    super(props);
    this.controller = new AbortController();
    this.signal = this.controller.signal;
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return shallowCompare(this, nextProps, nextState);
  // }

  async componentDidMount() {
    document.addEventListener('mousemove', this.mousemove);
    this.interval = setInterval(() => {
      console.log('interval');
    }, 1000);
    try {
      const res = await fetch('https://fakestoreapi.com/products/1', { signal: this.signal });
      const json = res.json();
      console.log(josn);
    } catch (error) {}
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.mousemove);
    clearInterval(this.interval);
    this.controller.abort();
  }

  mousemove = () => {
    console.log('mouse move');
  };

  render() {
    console.log('child 1 component');
    return (
      <div>
        <h1>Child 1 component</h1>
        <h2>{this.props.name}</h2>
      </div>
    );
  }
}

export default Child1;
