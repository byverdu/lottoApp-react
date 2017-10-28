import React, { Component } from 'react';
import './Home.css';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import { utils } from '../../utils';

export default class Home extends Component {

  constructor() {
    super();
    this.state = {
      buttons: []
    }
  }

  componentDidMount() {
    utils.serviceApi( 'lottos' )
      .then( resp => this.setState({buttons: resp.data.lottos}));
  }

  buttonsRenderer( buttons ) {
    return buttons.map(( item, index ) => (
      <Grid key={index} item lg={12}>
        <Button>
          {item}
        </Button >
      </Grid >
    )
    );
  }

  render() {
    return (
      <main className="lottoApp">
        <Grid
        container
        alignItems="center"
        justify="center"
        wrap="nowrap"
        direction="column"
      >
          <Grid item xs={12}>
            <AppBar
              className="AppBar"
              color="accent"
              position="absolute"
            >
              Home
            </AppBar>
          </Grid >
        </Grid>        
        <Grid 
          container
          alignItems="center"
          justify="center"
          wrap="nowrap"
          direction="column"
        >
          <Paper elevation={4}>
            {this.buttonsRenderer( this.state.buttons )}
          </Paper>
        </Grid >
      </main>
    );
  }
}
