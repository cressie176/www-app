import React from 'react';
import { mount, } from 'enzyme';
import IconListItem from './IconListItem';

describe('IconListItem', () => {

  it('should render list item with an icon, text and url', () => {
    const wrapper = mount(
      <IconListItem icon='fa-github' text='GitHub' url='https://github' type='social' />
    );

    expect(wrapper.hasClass('icon-list__item')).toBe(true);
    expect(wrapper.hasClass('icon-list__item--social')).toBe(true);

    expect(wrapper.find('i').hasClass('fa-github')).toBe(true);
    expect(wrapper.find('a i').exists()).toBe(false);
    expect(wrapper.find('a').prop('href')).toBe('https://github');
    expect(wrapper.find('a').text()).toBe('GitHub');
  });

  it('should render list item with an icon and text', () => {
    const wrapper = mount(
      <IconListItem icon='fa-github' text='GitHub' type='social'/>
    );

    expect(wrapper.hasClass('icon-list__item')).toBe(true);
    expect(wrapper.hasClass('icon-list__item--social')).toBe(true);

    expect(wrapper.find('i').hasClass('fa-github')).toBe(true);
    expect(wrapper.find('span').text()).toBe('GitHub');
    expect(wrapper.find('a').exists()).toBe(false);
  });

  it('should render list item with an icon and url', () => {
    const wrapper = mount(
      <IconListItem icon='fa-github' url='https://github' type='social'/>
    );

    expect(wrapper.hasClass('icon-list__item')).toBe(true);
    expect(wrapper.hasClass('icon-list__item--social')).toBe(true);

    expect(wrapper.find('a i').hasClass('fa-github')).toBe(true);
    expect(wrapper.find('a').prop('href')).toBe('https://github');
    expect(wrapper.find('a').text()).toBe('');
  });

  it('should render list item with text and url', () => {
    const wrapper = mount(
      <IconListItem text='GitHub' url='https://github' type='social'/>
    );

    expect(wrapper.hasClass('icon-list__item')).toBe(true);
    expect(wrapper.hasClass('icon-list__item--social')).toBe(true);

    expect(wrapper.find('i').exists()).toBe(false);
    expect(wrapper.find('a').prop('href')).toBe('https://github');
    expect(wrapper.find('a').text()).toBe('GitHub');
  });

  it('should render list item with an icon', () => {
    const wrapper = mount(
      <IconListItem icon='fa-github' type='social'/>
    );

    expect(wrapper.hasClass('icon-list__item')).toBe(true);
    expect(wrapper.hasClass('icon-list__item--social')).toBe(true);

    expect(wrapper.find('i').hasClass('fa-github')).toBe(true);
    expect(wrapper.find('a').exists()).toBe(false);
  });

  it('should render list item with text', () => {
    const wrapper = mount(
      <IconListItem text='GitHub' type='social'/>
    );

    expect(wrapper.hasClass('icon-list__item')).toBe(true);
    expect(wrapper.hasClass('icon-list__item--social')).toBe(true);

    expect(wrapper.find('span').text()).toBe('GitHub');
    expect(wrapper.find('i').exists()).toBe(false);
    expect(wrapper.find('a').exists()).toBe(false);
  });

});
