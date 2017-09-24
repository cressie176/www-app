import React from 'react';
import { shallow, } from 'enzyme';
import ArticleSummary from './ArticleSummary';

describe('Article Summary', () => {

  it('should render article summary', () => {

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

});
