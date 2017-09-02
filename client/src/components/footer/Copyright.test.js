import React from 'react';
import { shallow, } from 'enzyme';
import { Copyright, } from './Copyright';

describe('Copyright', () => {

  it('should render copyright text', () => {
    const wrapper = shallow(
      <Copyright id='copyright' year={2012} owner='Bob Holness' rights='Meh.' />
    );

    expect(wrapper.text()).toBe('© 2012 Bob Holness. Meh.');
  });

  it('should not render copyright text while initialising', () => {
    const wrapper = shallow(
      <Copyright id='' year={2012} owner='Bob Holness' rights='Meh.' />
    );

    expect(wrapper.hasClass('copyright')).toBe(true);
    expect(wrapper.text()).toBe('');
  });


});
