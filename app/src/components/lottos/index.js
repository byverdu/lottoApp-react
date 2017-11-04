import React, { Component } from 'react';
import { connect } from 'react-redux';
import { utils } from '../../utils/';
import { Link, Route, Switch } from 'react-router-dom';
import { fetchRaffles, preFetch } from '../../redux/actions/fetchApiActions';
import Raffles from './raffles';
import Results from './results';

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
        <div>
          <Switch>
            <Route path="/lottos/:name/raffle" render={() => ( <Raffles  data={this.props.raffle} /> )} />
            <Route path="/lottos/:name/results" render={() => ( <Results  data={this.props.raffle} /> )} />
          </Switch>
        </div>
        <Link to="/">Home</Link>
        <Link to={"/lottos/" + this.lottoName + "/raffle"}>Raffles</Link>
        <Link to={"/lottos/" + this.lottoName + "/results"}>Results</Link>
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