import React from 'react';
import { shallow, } from 'enzyme';
import Article from './Article';

describe('Article', () => {

  it('should render article', () => {

    const article = {
      id: 1,
      url: '/blog/article-1',
      title: 'Article 1',
      body: '<p>blurb</p>',
      tweet: 'meh',
      author: {
        twitterUsername: 'cressie176',
      },
    };

    const wrapper = shallow(
      <Article { ...article } />
    );

    expect(wrapper.is('.article')).toBe(true);
    expect(wrapper.find('.article__body').html()).toBe('<div class=\"article__body\"><p>blurb</p></div>');
    expect(wrapper.find('SocialButtons').prop('tweet')).toBe('meh');
    expect(wrapper.find('SocialButtons').prop('user').twitterUsername).toBe('cressie176');
  });

});
