import React from 'react';
import { shallow, } from 'enzyme';
import ArticlePage from './ArticlePage';

describe('ArticlePage', () => {

  it('should render while loading', () => {
    const wrapper = shallow(
      <ArticlePage
        id={1}
        article={{ id: 1, title: 'Article 1', url: '/article-1', }}
        loading={ true }
        path='/article-1'
      />
    );
    expect(wrapper.is('.article-page')).toBe(true);
  });

  it('should render message on error', () => {

    const wrapper = shallow(
      <ArticlePage
        id={1}
        article={{ id: 1, title: 'Article 1', }}
        error={ new Error('Oh Noes!') }
        path=''
      />
    );

    expect(wrapper.is('Connect(ErrorPage)')).toBe(true);
    expect(wrapper.prop('title')).toBe('Error loading article');
  });

  it('should render message on missing article', () => {

    const wrapper = shallow(
      <ArticlePage
        id={1}
        article={{ id: 1, title: 'Article 1', }}
        missing={ true }
        path=''
      />
    );

    expect(wrapper.is('Connect(ErrorPage)')).toBe(true);
    expect(wrapper.prop('title')).toBe('Page Not Found');
  });

  it('should redirect to canonical url', () => {

    const wrapper = shallow(
      <ArticlePage
        id={1}
        path='/blog/other-1'
        article={{ id: 1, title: 'Article 1', url: '/blog/article-1', }}
      />
    );

    expect(wrapper.is('Redirect')).toBe(true);
    expect(wrapper.prop('to')).toBe('/blog/article-1');
  });

  it('should not redirect when different article', () => {

    const wrapper = shallow(
      <ArticlePage
        id={1}
        article={{ id: 2, title: 'Article 2', url: '/blog/article-2', images: { main: {}, }, }}
        path='/blog/other-2'
      />
    );

    expect(wrapper.is('.article-page')).toBe(true);
  });

  it('should render article', () => {

    const wrapper = shallow(
      <ArticlePage
        id={1}
        article={{
          id: 1,
          url: '/blog/article-1',
          title: 'Article 1',
          body: '<p>blurb</p>',
          tweet: 'meh',
          author: {
            twitterUsername: 'cressie176',
          },
        }}
        path='/blog/article-1'
      />
    );

    expect(wrapper.is('.article-page')).toBe(true);
    expect(wrapper.find('PageIntro').prop('title')).toBe('Article 1');
    expect(wrapper.find('Article').prop('title')).toBe('Article 1');
    expect(wrapper.find('Article').prop('body')).toBe('<p>blurb</p>');
    expect(wrapper.find('SocialButtons').prop('tweet')).toBe('meh');
    expect(wrapper.find('SocialButtons').prop('user').twitterUsername).toBe('cressie176');
  });

});
