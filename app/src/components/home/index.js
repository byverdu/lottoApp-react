import React, { Component } from 'react';
import './Home.css';
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import { fetchLottos, preFetch } from '../../redux/actions/fetchApiActions';
import { connect } from 'react-redux';
import { utils } from '../../utils/';
import { Link } from 'react-router-dom';

class Home extends Component {

  constructor( props ) {
    super( props );
    this.props.dispatch( preFetch());
  }

  componentDidMount() {
    utils.serviceApi( 'lottos' )
      .then( resp =>
        this.props.dispatch(
          fetchLottos( resp.data.lottos )
        )
      );
  }

  buttonsRenderer( buttons ) {
    return buttons.map(( item, index ) => (
      <Grid key={index} item lg={12}>
        <Link to={"lottos/" + item + "/raffle"}>{item}</Link>        
      </Grid >
    )
    );
  }

  render() {
    if ( this.props.isLoading || !this.props.lottos ) {
      return (
        <div>
        Loading  Page ....
        </div>
      )
    }
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
            {this.buttonsRenderer( this.props.lottos )}
          </Paper>
        </Grid >
      </main>
    );
  }
}

const mapStateToProps = function( store ) {
  return {
    lottos: store.api.lottos,
    isLoading: store.api.isLoading
  };
}

export default connect( mapStateToProps )( Home );
