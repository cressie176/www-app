import React from 'react';
import { shallow, } from 'enzyme';
import FeaturedProject from './FeaturedProject';

describe('Featured Project', () => {


  it('should render a featured project without stats', () => {

    const project = { id: 'yadda', title: 'Yadda',  url: 'https://yadda', summary:'meh', };

    const wrapper = shallow(

      <FeaturedProject
        { ...project }
        fetchDownloadCount={() => {}}
      />
    );

    expect(wrapper.hasClass('featured-project')).toBe(true);
    expect(wrapper.find('.featured-project__link').prop('href')).toBe('https://yadda');
    expect(wrapper.find('.featured-project__link').text()).toBe('Yadda');
    expect(wrapper.find('.featured-project__stats i').hasClass('fa-spinner')).toBe(true);
    expect(wrapper.find('.featured-project__stats').hasClass('featured-project__stats--loading')).toBe(true);
    expect(wrapper.find('.featured-project__stats').text()).toBe('');
  });

  it('should render a featured project with stats', () => {

    const project = { id: 'yadda', title: 'Yadda',  url: 'https://yadda', summary:'meh', stats: { data: { downloads: 1000, }, meta: { loading: false, }, }, };


    const wrapper = shallow(
      <FeaturedProject
        { ...project }
        fetchDownloadCount={() => {}}
      />
    );

    expect(wrapper.hasClass('featured-project')).toBe(true);
    expect(wrapper.find('.featured-project__link').prop('href')).toBe('https://yadda');
    expect(wrapper.find('.featured-project__link').text()).toBe('Yadda');
    expect(wrapper.find('.featured-project__stats i').hasClass('fa-spinner')).toBe(false);
    expect(wrapper.find('.featured-project__stats').hasClass('featured-project__stats--loaded')).toBe(true);
    expect(wrapper.find('.featured-project__stats').text()).toBe('1,000');
  });


  it('should render a featured project while loading stats', () => {

    const project = { id: 'yadda', title: 'Yadda',  url: 'https://yadda', summary:'meh', stats: { meta: { loading: true, }, data: {}, }, };


    const wrapper = shallow(
      <FeaturedProject
        { ...project }
        fetchDownloadCount={() => {}}
      />
    );

    expect(wrapper.hasClass('featured-project')).toBe(true);
    expect(wrapper.find('.featured-project__link').prop('href')).toBe('https://yadda');
    expect(wrapper.find('.featured-project__link').text()).toBe('Yadda');
    expect(wrapper.find('.featured-project__stats i').hasClass('fa-spinner')).toBe(true);
    expect(wrapper.find('.featured-project__stats').hasClass('featured-project__stats--loading')).toBe(true);
    expect(wrapper.find('.featured-project__stats').text()).toBe('');
  });


  it('should render a featured project with stats error', () => {

    const project = { id: 'yadda', title: 'Yadda',  url: 'https://yadda', summary:'meh', stats: { meta: { loading: false, error: new Error('Oh Noes!'), }, data: {}, }, };


    const wrapper = shallow(
      <FeaturedProject
        { ...project }
        fetchDownloadCount={() => {}}
      />
    );

    expect(wrapper.hasClass('featured-project')).toBe(true);
    expect(wrapper.find('.featured-project__link').prop('href')).toBe('https://yadda');
    expect(wrapper.find('.featured-project__link').text()).toBe('Yadda');
    expect(wrapper.find('.featured-project__stats i').hasClass('fa-spinner')).toBe(false);
    expect(wrapper.find('.featured-project__stats').hasClass('featured-project__stats--error')).toBe(true);
    expect(wrapper.find('.featured-project__stats').text()).toBe('');
  });

});
