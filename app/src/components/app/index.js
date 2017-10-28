import React, { Component } from 'react';
import Home from '../home';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <Home />
    );
  }
}
