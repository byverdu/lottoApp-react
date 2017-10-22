import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Header extends Component {
  constructor( props ) {
    super(props);
    this.state = {
      data: props.data
    };
  }

  render() {
    const {data} = this.state
    return(
      <header>
        <header className="App-header">
          <h1 className="App-title">{this.state.data}</h1>
        </header>
      </header>
    )
  }
}  

class App extends Component {
  render() {
    const x = "clclcclclcl";
    return (
      <div className="App">
        <Header data={x} />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
