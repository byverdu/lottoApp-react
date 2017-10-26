// import React from 'react';
import {
  shallow, mount, chai, React
} from '../utils/tests-setup';
import App from '../components/app';
import Home from '../components/home';

const expect = chai.expect;
let wrapper;
let mounted;

beforeEach(() => {
  wrapper = shallow( <App /> );
  mounted = mount( <App /> );
});

describe( 'App content', () => {
  it( 'App has a Home component', () => {
    const grid = mounted.find( Home );
    expect( grid ).to.have.length( 1 );
  });
});
