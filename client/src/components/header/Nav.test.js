import React from 'react';
import { mount, } from 'enzyme';
import { MemoryRouter as Router, } from 'react-router';
import { Nav, } from './Nav';

describe('Nav', () => {

  it('should render navbar', () => {
    const wrapper = mount(
      <Router>
        <Nav
          location={{ pathname: '/', }}
          links={[
            { text: 'one', url: '/one', icon: 'fa-home', },
            { text: 'two', url: '/two', icon: 'fa-cogs', },
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
          location={{ pathname: '/', }}
          links={[
            { text: 'current', url: '/', icon: 'fa-home', },
            { text: 'other', url: '/other', icon: 'fa-cogs', },
          ]} />
      </Router>
    );
    expect(wrapper.find('ul li').first().hasClass('active')).toBe(true);
    expect(wrapper.find('ul li a').first().hasClass('active')).toBe(true);
    expect(wrapper.find('ul li a span').at(1).text()).toBe('(current)');
  });
});
