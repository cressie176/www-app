import React from 'react';
import { shallow, } from 'enzyme';
import { FeaturedProject, } from './FeaturedProject';

describe('FeatureProject', () => {

  it('should render a featured project while fetching download count', () => {

    const wrapper = shallow(
      <FeaturedProject id='yadda' title='Yadda' url='https://yadda' summary='meh' />
    );

    expect(wrapper.hasClass('featured-project')).toBe(true);
    expect(wrapper.find('.featured-project__link').prop('href')).toBe('https://yadda');
    expect(wrapper.find('.featured-project__link').text()).toBe('Yadda');
    expect(wrapper.find('.featured-project__downloads__icon').hasClass('fa-spinner')).toBe(true);
    expect(wrapper.find('.featured-project__downloads').hasClass('featured-project__downloads--loading')).toBe(true);
    expect(wrapper.find('.featured-project__downloads').text()).toBe('');
  });

  it('should render a featured project with download count', () => {

    const wrapper = shallow(
      <FeaturedProject id='yadda' title='Yadda' url='https://yadda' summary='meh' downloads={1000} />
    );

    expect(wrapper.hasClass('featured-project')).toBe(true);
    expect(wrapper.find('.featured-project__link').prop('href')).toBe('https://yadda');
    expect(wrapper.find('.featured-project__link').text()).toBe('Yadda');
    expect(wrapper.find('.featured-project__downloads__icon').hasClass('fa-download')).toBe(true);
    expect(wrapper.find('.featured-project__downloads').hasClass('featured-project__downloads--loaded')).toBe(true);
    expect(wrapper.find('.featured-project__downloads').text()).toBe('1,000');
  });


});
