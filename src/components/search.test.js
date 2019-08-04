import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './Search';

Enzyme.configure({ adapter: new Adapter() });

describe('Test Search', () => {
  it('Reset msg before request photos', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ msg: 'error' });
    wrapper.find('.button').simulate('click');
    const state = wrapper.state('msg')
    expect(state).toBe('');
  })
});
