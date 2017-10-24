// import React from 'react';
import {
  shallow, mount, chai, React, sinon
} from '../utils/tests-setup';
import App from '../components/app';
import Button from 'material-ui/Button';

const expect = chai.expect;
let wrapper;
let mounted;

beforeEach(() => {
    wrapper = shallow( <App /> );
    mounted = mount( <App /> );
});

describe( 'App lifecycle', () => {
  it( 'calls componentDidMount', () => {
    sinon.spy( App.prototype, 'componentDidMount' );    
    mount( <App /> );
    expect( App.prototype.componentDidMount.calledOnce )
      .to.equal( true );
  });
})

describe( 'App content', () => {
  it( 'contains a <main> element', () => {
    expect( wrapper.html()).to.contain( '</main>' );
    expect( wrapper.hasClass( 'lottoApp' )).to.eql( true );
  });

  it( 'App has a title', () => {
    const title = mounted.find( 'h2.lottoApp__title' );
    expect( title ).to.have.length( 1 );
    expect( title.text()).to.eq( 'Home' );
  });

  it( 'App has a content section', () => {
    const title = mounted.find( 'section.lottoApp__section' );
    expect( title ).to.have.length( 1 );
  });

  it( 'App has 3 buttons', () => {
    const title = mounted.find( Button );
    expect( title ).to.have.length( 3 );
    // expect( title.text()).to.eq( 'Home' );
  });
})
