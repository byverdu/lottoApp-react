import React, { Component } from 'react';
import { connect } from 'react-redux';
import { utils } from '../../utils/';
import { Link, Route, Switch } from 'react-router-dom';
import { fetchRaffles, preFetch } from '../../redux/actions/fetchApiActions';

class Lotto extends Component {
  constructor( props ) {
    super( props );
    this.props.dispatch( preFetch());
  }

  get lottoName() {
    return this.props.match.params.name;
  }

  componentDidMount() {
    utils.serviceApi( this.lottoName )
      .then( resp =>
        this.props.dispatch(
          fetchRaffles( resp.data[ this.lottoName ])
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
        <h1>
          {this.lottoName}
        </h1>
        <div>
          <Switch>
            <Route path="/lottos/:name/raffle" render={
              utils.callbackRenderComponentRoute( 'raffles', this.props.raffle )
            }/>
            <Route path="/lottos/:name/results" render={
              utils.callbackRenderComponentRoute( 'results', this.props.raffle )
            }/>
            <Route path="/lottos/:name/statistics" render={
              utils.callbackRenderComponentRoute( 'statistics', this.props.raffle )
            }/>
          </Switch>
        </div>
        <Link to="/">
          Home
        </Link>
        <Link to={
          utils.buildLinkUrl( this.lottoName, 'raffle' )
        }>
          Raffles
        </Link>
        <Link to={
          utils.buildLinkUrl( this.lottoName, 'results' )
        }>
          Results
        </Link>
        <Link to={
          utils.buildLinkUrl( this.lottoName, 'statistics' )
        }>
          Statistics
        </Link>
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