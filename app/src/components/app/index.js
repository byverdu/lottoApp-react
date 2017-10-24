import React, { Component } from 'react';
import './App.css';
import Button from 'material-ui/Button';

export default class App extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <main className="lottoApp">
        <h2 className="lottoApp__title">
          Home
        </h2>
        <section className="lottoApp__section">
          <Button>
            xoxo
          </Button>
          <Button>
            xooxo
          </Button>
          <Button>
            xllxlxl
          </Button >
        </section>
      </main>
    );
  }
}
