// import React from 'react';
import {
  shallow, mount, chai, React, sinon
} from '../utils/tests-setup';
import Home from '../components/home';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';

const expect = chai.expect;
let wrapper;
let mounted;

beforeEach(() => {
  wrapper = shallow( <Home /> );
  mounted = mount( <Home /> );
});

describe( 'Home lifecycle', () => {
  it( 'calls componentDidMount', () => {
    sinon.spy( Home.prototype, 'componentDidMount' );    
    mount( <Home /> );
    expect( Home.prototype.componentDidMount.calledOnce )
      .to.equal( true );
  });
})

describe( 'Home content', () => {
  it( 'contains a <main> element', () => {
    expect( wrapper.html()).to.contain( '</main>' );
    expect( wrapper.hasClass( 'lottoApp' )).to.eql( true );
  });

  it( 'Home has Grid layout with container and 2 items', () => {
    const grid = mounted.find( Grid );
    expect( grid ).to.have.length( 6 );
    expect( grid.get( 0 ).props.container ).to.be.eq( true );
    expect( grid.get( 1 ).props.item ).to.be.eq( true );
  });

  it( 'Home has a title inside a AppBar', () => {
    const title = mounted.find( AppBar );
    expect( title ).to.have.length( 1 );
    expect( title.text()).to.eq( 'Home' );
    expect( title.props().color ).to.eq( 'accent' );  
  });

  it( 'Home has 3 buttons', () => {
    const buttons = mounted.find( Button );
    expect( buttons ).to.have.length( 3 );
    expect( buttons.first().text()).to.eq( 'Primitiva' );
  });
})
