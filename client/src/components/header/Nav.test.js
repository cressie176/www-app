import React from 'react';
import { mount, } from 'enzyme';
import { MemoryRouter as Router, } from 'react-router';
import Nav from './Nav';

describe('Nav', () => {

  it('should render navbar', () => {
    const wrapper = mount(
      <Router>
        <Nav
          items={[
            { text: 'one', path: '/one', },
            { text: 'two', path: '/two', },
          ]} />
      </Router>
    );

    expect(wrapper.find('ul li').length).toBe(2);
    expect(wrapper.find('ul li a').first().prop('href')).toBe('/one');
    expect(wrapper.find('ul li a').first().text()).toBe('one');
    expect(wrapper.find('ul li a').last().prop('href')).toBe('/two');
    expect(wrapper.find('ul li a').last().text()).toBe('two');
  });

  it('should highlight the current page', () => {
    const wrapper = mount(
      <Router>
        <Nav
          items={[
            { text: 'current', path: '/', },
            { text: 'other', path: '/other', },
          ]} />
      </Router>
    );

    expect(wrapper.find('ul li').first().hasClass('active')).toBe(true);
    expect(wrapper.find('ul li a').first().hasClass('active')).toBe(true);
    expect(wrapper.find('ul li a span').first().text()).toBe('(current)');
  });
});
