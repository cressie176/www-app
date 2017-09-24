import React from 'react';
import { shallow, } from 'enzyme';
import ArticleSummary from './ArticleSummary';

describe('Article Summary', () => {

  it('should render minimal article summary', () => {

    const article = {
      id: 1,
      url: '/blog/article-1',
      title: 'Article 1',
      summary: '<p>blurb</p>',
      images: {
        thumbnail: {
          url: '/images/article-1.jpg',
        },
      },
    };

    const wrapper = shallow(
      <ArticleSummary { ...article } />
    );

    expect(wrapper.is('.article-summary')).toBe(true);
    expect(wrapper.find('.article-summary__title').find('Link').prop('to')).toBe('/blog/article-1');
    expect(wrapper.find('.article-summary__body').html()).toBe('<div class=\"article-summary__body\"><p>blurb</p></div>');
  });

  it('should render full article', () => {

    const article = {
      id: 1,
      url: '/blog/article-1',
      title: 'Article 1',
      summary: '<p>blurb</p>',
      images: {
        thumbnail: {
          url: '/images/article-1.jpg',
        },
      },
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
      <ArticleSummary { ...article } />
    );

    expect(wrapper.is('.article-summary')).toBe(true);

    expect(wrapper.find('IconListItem[id="date"]').prop('text')).toBe('2017 M01 1, Sun');
    expect(wrapper.find('IconListItem[id="event"]').prop('text')).toBe('meetup');
    expect(wrapper.find('IconListItem[id="event"]').prop('url')).toBe('http://meetup');
    expect(wrapper.find('IconListItem[id="event"]').prop('noFollow')).toBe(undefined);
    expect(wrapper.find('IconListItem[id="location"]').prop('text')).toBe('London');
  });

});
