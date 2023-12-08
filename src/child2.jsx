import React, { Component } from 'react';

// Mounting

// 1. constructor

// Updating

// unmounting

// error

export default class Child2 extends Component {
  // base on props define state value
  // method binding
  constructor(props) {
    super(props);

    console.log(props);

    console.log('constructor child 2');
    this.state = {
      count: 0,
      productInfo: null,
      // greet: `hello ${props.name}`,
    };

    // analytics
  }

  // derive state value base on props
  // this life cycle mehtod call everytime whenever props or state value change;
  static getDerivedStateFromProps(props, state) {
    return {
      greet: 'hello',
    };
  }

  async componentDidMount() {
    try {
      const res = await fetch('https://fakestoreapi.com/products/1');
      const json = await res.json();

      console.log(json);
      this.setState({ productInfo: json });

      document.getElementById('');

      document.getElementById('heading1').addEventListener('copy', () => {
        console.log('text copied');
      });
    } catch (error) {}
  }

  changeGreet = () => {
    this.setState((state, props) => ({
      greet: `Bonjour ${props.name}`,
    }));
  };

  increment = () => {
    this.setState(({ count }) => ({ count: count + 1 }));
  };

  decrement = () => {
    this.setState(({ count }) => ({ count: count - 1 }));
  };

  render() {
    console.log('render child 2');
    const { count, greet, productInfo } = this.state;

    console.log(productInfo);

    return (
      <div>
        {productInfo?.title && <h1 id="heading">{productInfo.title}</h1>}
        <h2 id="heading1">hello world</h2>
        <button type="button" onClick={this.changeGreet}>
          Change Greet
        </button>
        <button type="button" onClick={this.increment}>
          +
        </button>
        <p>{count}</p>
        <button type="button" onClick={this.decrement}>
          -
        </button>
      </div>
    );
  }
}
