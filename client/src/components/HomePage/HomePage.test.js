import React from 'react';
import { shallow, } from 'enzyme';
import HomePage from './HomePage';

describe('Home Page', () => {

  it('should render message on error', () => {
    const wrapper = shallow(
      <HomePage
        id='blog'
        error={new Error('Oh Noes!')}
        page={{}}
      />
    );

    expect(wrapper.is('Connect(ErrorPage)')).toBe(true);
    expect(wrapper.prop('title')).toBe('Error loading page');
  });

  it('should render message on not found', () => {
    const wrapper = shallow(
      <HomePage
        id='blog'
        missing={true}
        page={{}}
      />
    );

    expect(wrapper.is('Connect(ErrorPage)')).toBe(true);
    expect(wrapper.prop('title')).toBe('Page Not Found');
  });

});
