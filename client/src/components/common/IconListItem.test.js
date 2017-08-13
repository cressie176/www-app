import React from 'react';
import { shallow, } from 'enzyme';
import IconListItem from './IconListItem';

describe('IconListItem', () => {

  it('should render list item with an icon, text and url', () => {
    const wrapper = shallow(
      <IconListItem icon='fa-github' text='GitHub' url='https://www.github.com/cressie176/' type='social'/>
    );

    expect(wrapper.hasClass('icon-list__item')).toBe(true);
    expect(wrapper.hasClass('icon-list__item--social')).toBe(true);

    expect(wrapper.find('i').hasClass('fa-github')).toBe(true);
    expect(wrapper.find('a i').exists()).toBe(false);
    expect(wrapper.find('a').prop('href')).toBe('https://www.github.com/cressie176/');
    expect(wrapper.find('a').text()).toBe('GitHub');
  });

  it('should render list item with an icon and text', () => {
    const wrapper = shallow(
      <IconListItem icon='fa-github' text='GitHub' type='social'/>
    );

    expect(wrapper.hasClass('icon-list__item')).toBe(true);
    expect(wrapper.hasClass('icon-list__item--social')).toBe(true);

    expect(wrapper.find('i').hasClass('fa-github')).toBe(true);
    expect(wrapper.find('span').text()).toBe('GitHub');
    expect(wrapper.find('a').exists()).toBe(false);
  });

  it('should render list item with an icon and url', () => {
    const wrapper = shallow(
      <IconListItem icon='fa-github' url='https://www.github.com/cressie176/' type='social'/>
    );

    expect(wrapper.hasClass('icon-list__item')).toBe(true);
    expect(wrapper.hasClass('icon-list__item--social')).toBe(true);

    expect(wrapper.find('a i').hasClass('fa-github')).toBe(true);
    expect(wrapper.find('a').prop('href')).toBe('https://www.github.com/cressie176/');
    expect(wrapper.find('a').text()).toBe('');
  });

  it('should render list item with text and url', () => {
    const wrapper = shallow(
      <IconListItem text='GitHub' url='https://www.github.com/cressie176/' type='social'/>
    );

    expect(wrapper.hasClass('icon-list__item')).toBe(true);
    expect(wrapper.hasClass('icon-list__item--social')).toBe(true);

    expect(wrapper.find('i').exists()).toBe(false);
    expect(wrapper.find('a').prop('href')).toBe('https://www.github.com/cressie176/');
    expect(wrapper.find('a').text()).toBe('GitHub');
  });

  it('should render list item with an icon', () => {
    const wrapper = shallow(
      <IconListItem icon='fa-github' type='social'/>
    );

    expect(wrapper.hasClass('icon-list__item')).toBe(true);
    expect(wrapper.hasClass('icon-list__item--social')).toBe(true);

    expect(wrapper.find('i').hasClass('fa-github')).toBe(true);
    expect(wrapper.find('a').exists()).toBe(false);
  });

  it('should render list item with text', () => {
    const wrapper = shallow(
      <IconListItem text='GitHub' type='social'/>
    );

    expect(wrapper.hasClass('icon-list__item')).toBe(true);
    expect(wrapper.hasClass('icon-list__item--social')).toBe(true);

    expect(wrapper.find('span').text()).toBe('GitHub');
    expect(wrapper.find('i').exists()).toBe(false);
    expect(wrapper.find('a').exists()).toBe(false);
  });

});
