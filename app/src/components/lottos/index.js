import React, { Component } from 'react';
import { connect } from 'react-redux';
import { utils } from '../../utils/';
import { Link } from 'react-router-dom';
import { fetchRaffles, preFetch } from '../../redux/actions/fetchApiActions';

class Lotto extends Component {
  constructor( props ) {
    super( props );
    this.props.dispatch( preFetch());
  }

  componentDidMount() {
    utils.serviceApi( this.props.match.params.name )
      .then( resp =>
        this.props.dispatch(
          fetchRaffles( resp.data[ this.props.match.params.name ] )
        )
      );
  }
  render() {
    if ( this.props.isLoading || !this.props.raffle ) {
      return (
        <div>
        Loading  Page ....
        </div>
      )
    }
    return(
      <div>
        <Link to="/">Home</Link>
        {this.props.match.params.name}
        {this.props.raffle.mostRepeated}
      </div>
    );
  }
}

const mapStateToProps = function( store ) {
  return {
    raffle: store.api.raffle,
    isLoading: store.api.isLoading
  };
}

export default connect( mapStateToProps )( Lotto );