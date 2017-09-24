import React from 'react';
import { shallow, } from 'enzyme';
import Article from './Article';

describe('Article', () => {

  it('should render minimal article', () => {

    const article = {
      id: 1,
      url: '/blog/article-1',
      title: 'Article 1',
      body: '<p>blurb</p>',
    };

    const wrapper = shallow(
      <Article { ...article } />
    );

    expect(wrapper.is('.article')).toBe(true);
    expect(wrapper.find('.article__body').html()).toBe('<div class=\"article__body\"><p>blurb</p></div>');
  });

  it('should render full article', () => {

    const article = {
      id: 1,
      url: '/blog/article-1',
      title: 'Article 1',
      body: '<p>blurb</p>',
      date: new Date('2017-01-01T00:00:00.000Z'),
      location: 'London',
      event: {
        text: 'meetup',
        url: 'http://meetup',
      },
      downloads: [
        {
          url: 'http://download-1',
          text: 'download-1',
          icon: 'fa-download-1',
        }, {
          url: 'http://download-2',
          text: 'download-2',
          icon: 'fa-download-2',
        },
      ],
    };

    const wrapper = shallow(
      <Article { ...article } />
    );

    expect(wrapper.is('.article')).toBe(true);

    expect(wrapper.find('IconListItem[id="date"]').prop('text')).toBe('2017 M01 1, Sun');
    expect(wrapper.find('IconListItem[id="event"]').prop('text')).toBe('meetup');
    expect(wrapper.find('IconListItem[id="event"]').prop('url')).toBe('http://meetup');
    expect(wrapper.find('IconListItem[id="event"]').prop('noFollow')).toBe(undefined);
    expect(wrapper.find('IconListItem[id="location"]').prop('text')).toBe('London');

    expect(wrapper.find('IconListItem[id="download"]').length).toBe(2);
    expect(wrapper.find('IconListItem[id="download"]').first().prop('url')).toBe('http://download-1');
    expect(wrapper.find('IconListItem[id="download"]').first().prop('text')).toBe('download-1');
    expect(wrapper.find('IconListItem[id="download"]').first().prop('icon')).toBe('fa-download-1');
    expect(wrapper.find('IconListItem[id="download"]').first().prop('noFollow')).toBe(true);
  });

});
