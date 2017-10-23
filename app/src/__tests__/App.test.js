// import React from 'react';
import {
  shallow, mount, chai, React
} from '../utils/tests-setup';
import App from '../components/app';

const expect = chai.expect;
let wrapper;
let mounted;

beforeEach(() => {
    wrapper = shallow( <App /> );
    mounted = mount( <App /> );
});


// configure({ adapter: new Adapter() });

it( 'renders without crashing', () => {
  shallow( <App /> );
});
