import React, { Component } from 'react';
import './Home.css';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import { fetchLottos, preFetch } from '../../redux/index';
import { connect } from 'react-redux';

class Home extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      buttons: [],
      isLoading: this.props.dispatch( preFetch()).isFetching
    }
  }

  // componentWillReceiveProps( nextProps ) {
  //   if ( nextProps.color !== this.state.color ) {
  //     this.setState({color: nextProps.color }, () => {
  //       this.refs.title.style.color = this.state.color;      
  //     });
  //   }
  // }

  componentDidMount() {
    this.props.dispatch(
      fetchLottos( 'lottos' ))
      .then( resp => this.setState({
        buttons: resp.json.data.lottos
      }, () => this.setState({
        isLoading: resp.isFetching
      }))
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
      this.state.isLoading ? 
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
            {this.buttonsRenderer( this.state.buttons )}
          </Paper>
        </Grid >
      </main>
    );
  }
}

function select( state ){
  console.log( state );
  return {
    buttons: state.buttons,
    isLoading: state.isLoading
  };
}

export default connect( select )( Home );
