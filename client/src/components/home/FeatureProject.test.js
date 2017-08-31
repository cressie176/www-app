import React from 'react';
import { shallow, } from 'enzyme';
import { FeaturedProject, } from './FeaturedProject';

describe('FeatureProject', () => {

  it('should render a message on error', () => {

    const wrapper = shallow(
      <FeaturedProject
        id='yadda'
        project={{ id: 'yadda', error: new Error('Oh Noes!'), }}
      />
    );

    expect(wrapper.hasClass('featured-project')).toBe(true);
    expect(wrapper.find('.featured-project--error').text()).toBe('Error loading module');
  });

  it('should render a message when missing', () => {

    const wrapper = shallow(
      <FeaturedProject
        id='yadda'
        project={{ id: 'yadda', missing: true, }}
      />
    );

    expect(wrapper.hasClass('featured-project')).toBe(true);
    expect(wrapper.find('.featured-project--missing').text()).toBe('Module not found');
  });

  it('should render a message while loading', () => {

    const wrapper = shallow(
      <FeaturedProject
        id='yadda'
        project={{ id: 'yadda', loading: true, }}
      />
    );

    expect(wrapper.hasClass('featured-project')).toBe(true);
    expect(wrapper.find('.featured-project--loading').text()).toBe('Loading…');
  });

  it('should render a featured project while fetching download count', () => {

    const wrapper = shallow(
      <FeaturedProject
        id='yadda'
        project={{ id: 'yadda', title: 'Yadda',  url: 'https://yadda', summary:'meh', downloads_loading: true, }}
        fetchProject={() => {}}
        fetchDownloadCount={() => {}}
      />
    );

    expect(wrapper.hasClass('featured-project')).toBe(true);
    expect(wrapper.find('.featured-project__link').prop('href')).toBe('https://yadda');
    expect(wrapper.find('.featured-project__link').text()).toBe('Yadda');
    expect(wrapper.find('.featured-project__downloads__icon').hasClass('fa-spinner')).toBe(true);
    expect(wrapper.find('.featured-project__downloads').hasClass('featured-project__downloads--loading')).toBe(true);
    expect(wrapper.find('.featured-project__downloads').text()).toBe('');
  });

  it('should render a featured project with missing download count', () => {

    const wrapper = shallow(
      <FeaturedProject
        id='yadda'
        project={{ id: 'yadda', title: 'Yadda',  url: 'https://yadda', summary:'meh', downloads_missing: true, }}
        fetchProject={() => {}}
        fetchDownloadCount={() => {}}
      />
    );

    expect(wrapper.hasClass('featured-project')).toBe(true);
    expect(wrapper.find('.featured-project__link').prop('href')).toBe('https://yadda');
    expect(wrapper.find('.featured-project__link').text()).toBe('Yadda');
    expect(wrapper.find('.featured-project__downloads__icon').hasClass('fa-spinner')).toBe(false);
    expect(wrapper.find('.featured-project__downloads').hasClass('featured-project__downloads--missing')).toBe(true);
    expect(wrapper.find('.featured-project__downloads').text()).toBe('');
  });

  it('should render a featured project with errored download count', () => {

    const wrapper = shallow(
      <FeaturedProject
        id='yadda'
        project={{ id: 'yadda', title: 'Yadda',  url: 'https://yadda', summary:'meh', downloads_error: new Error('Oh Noes!'), }}
        fetchProject={() => {}}
        fetchDownloadCount={() => {}}
      />
    );

    expect(wrapper.hasClass('featured-project')).toBe(true);
    expect(wrapper.find('.featured-project__link').prop('href')).toBe('https://yadda');
    expect(wrapper.find('.featured-project__link').text()).toBe('Yadda');
    expect(wrapper.find('.featured-project__downloads__icon').hasClass('fa-spinner')).toBe(false);
    expect(wrapper.find('.featured-project__downloads').hasClass('featured-project__downloads--error')).toBe(true);
    expect(wrapper.find('.featured-project__downloads').text()).toBe('');
  });

  it('should render a featured project with download count', () => {

    const wrapper = shallow(
      <FeaturedProject
        id='yadda'
        project={{ id: 'yadda', title: 'Yadda',  url: 'https://yadda', summary:'meh', downloads: 1000, }}
        fetchProject={()=>{}}
        fetchDownloadCount={() => {}}
      />
    );

    expect(wrapper.hasClass('featured-project')).toBe(true);
    expect(wrapper.find('.featured-project__link').prop('href')).toBe('https://yadda');
    expect(wrapper.find('.featured-project__link').text()).toBe('Yadda');
    expect(wrapper.find('.featured-project__downloads__icon').hasClass('fa-download')).toBe(true);
    expect(wrapper.find('.featured-project__downloads').hasClass('featured-project__downloads--loaded')).toBe(true);
    expect(wrapper.find('.featured-project__downloads').text()).toBe('1,000');
  });

});
