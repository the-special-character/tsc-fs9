import React, { Component } from 'react';
import { Button } from './components/ui/button';

export default class Todo extends Component {
  //   static propTypes = {second: third}

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h2>Lorem ipsum dolor sit amet.</h2>
        <Button>Click Me</Button>
      </div>
    );
  }
}
