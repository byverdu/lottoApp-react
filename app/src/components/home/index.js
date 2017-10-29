import React, { Component } from 'react';
import './Home.css';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import { utils } from '../../utils';
import { changeColorAction } from '../../redux/index';
import { connect } from 'react-redux';

class Home extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      buttons: [],
      color: props.color
    }
    this.handleClick = this.handleClick.bind( this );
  }

  handleClick( dispatch ) {
    // @ts-ignore
    this.props.dispatch( changeColorAction( this.refs.color.value ));
  }

  componentWillReceiveProps( nextProps ) {
    console.log( nextProps, this.state, 'componentWillReceiveProps' );
    if ( nextProps.color !== this.state.color ) {
      this.setState({color: nextProps.color }, () => {
        this.refs.title.style.color = this.state.color;      
      });
    }
  }

  componentDidMount() {
    this.refs.title.style.color = this.state.color;
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
            <h1 ref="title">
              Home
            </h1>
            <button onClick={this.handleClick}>Change</button>
            <input ref="color" />
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
    color: state.color
  };
}

export default connect( select )( Home );
