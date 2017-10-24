import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

import { shallow, mount } from 'enzyme';
import chai from 'chai';
import React from 'react';
import sinon from 'sinon';

configure({ adapter: new Adapter() });

export {
  shallow, mount, chai, React, sinon
};
