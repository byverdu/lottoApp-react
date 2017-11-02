import React, { Component } from 'react';
import './Home.css';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import { responseFromApi, preFetch } from '../../redux/actions/fetchApi';
import { connect } from 'react-redux';
import { utils } from '../../utils/';

class Home extends Component {

  constructor( props ) {
    super( props );
    this.props.dispatch( preFetch());
  }

  componentDidMount() {
    utils.serviceApi( 'lottos' )
      .then( resp =>
        this.props.dispatch(
          responseFromApi( resp.data.lottos )
        )
      );
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
      this.props.isLoading ? 
        <div>
        Loading  Page ....
        </div>
        :
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
              HOME
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
              {this.buttonsRenderer( this.props.buttons )}
            </Paper>
          </Grid >
        </main>
    );
  }
}

const mapStateToProps = function( store ) {
  return {
    buttons: store.api.data,
    isLoading: store.api.isLoading
  };
}

export default connect( mapStateToProps )( Home );
