import React, { Component } from 'react';
import { connect } from 'react-redux';
import { utils } from '../../utils/';
import { Link, Route, Switch } from 'react-router-dom';
import { fetchRaffles, preFetch } from '../../redux/actions/fetchApiActions';
import Winners from './winners';

class Lotto extends Component {
  constructor( props ) {
    super( props );
    this.props.dispatch( preFetch());

    this.linkRepeater = this.linkRepeater.bind( this );
    this.routeRepeater = this.routeRepeater.bind( this );
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

  linkRepeater() {
    const linksData = { 
      raffles: 'Raffle',
      results: 'Results',
      statistics: 'Statistics',
      winners: 'Winners'
    };

    return Object.keys( linksData )
      .map(( link, key ) => {
        return (
          <Link className="link" key={key} to={
            utils.buildLinkUrl( this.lottoName, link )
          }>
            {linksData[ link ]}
          </Link>
        );
      })
  }

  routeRepeater() {
    const routesData = [
      'raffles', 'results', 'statistics'
    ];

    return routesData.map(( route, key ) => {
      return (
        <Route
          key={key}
          path={"/lottos/:name/" + route}
          render={
            utils.callbackRenderComponentRoute(
              route, this.props.raffle
            )
        }/>
      );
    });
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
            {this.routeRepeater()}
            <Route path="/lottos/:name/winners" component={Winners}/>
          </Switch>
        </div>
        <Link to="/">
          Home
        </Link>
        {this.linkRepeater()}
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