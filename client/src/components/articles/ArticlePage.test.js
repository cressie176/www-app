import React from 'react';
import { shallow, } from 'enzyme';
import ArticlePage from './ArticlePage';

describe('ArticlePage', () => {

  it('should render message while loading', () => {
    const wrapper = shallow(
      <ArticlePage
        id={1}
        article={{ id: 1, loading: true, }}
      />
    );
    expect(wrapper.is('.article-page')).toBe(true);
    expect(wrapper.find('PageIntro').prop('title')).toBe('Loading…');
  });

  it('should render message on error', () => {

    const wrapper = shallow(
      <ArticlePage
        id={1}
        article={{ id: 1, error: new Error('Oh Noes!'), }}
      />
    );

    expect(wrapper.is('Connect(ErrorPage)')).toBe(true);
    expect(wrapper.prop('title')).toBe('Error loading article');
  });

  it('should render message on missing article', () => {

    const wrapper = shallow(
      <ArticlePage
        id={1}
        article={{ id: 1, missing: true, }}
      />
    );

    expect(wrapper.is('Connect(ErrorPage)')).toBe(true);
    expect(wrapper.prop('title')).toBe('Page Not Found');
  });

  it('should render empty div when article is uninitialised', () => {

    const wrapper = shallow(
      <ArticlePage
        id={1}
        article={{}}
      />
    );

    expect(wrapper.is('.article-page')).toBe(true);
    expect(wrapper.children().length).toBe(0);
  });

  it('should redirect to canonical url', () => {

    const wrapper = shallow(
      <ArticlePage
        id={1}
        article={{ id: 1, url: '/blog/article-1', }}
        location={{ pathname: '/blog/other-1', }}
      />
    );

    expect(wrapper.is('Redirect')).toBe(true);
    expect(wrapper.prop('to')).toBe('/blog/article-1');
  });

  it('should not redirect when different article', () => {

    const wrapper = shallow(
      <ArticlePage
        id={1}
        article={{ id: 2, url: '/blog/article-2', images: { main: {}, }, }}
        location={{ pathname: '/blog/other-2', }}
      />
    );

    expect(wrapper.is('.article-page')).toBe(true);
  });

  it('should render minimal article', () => {

    const wrapper = shallow(
      <ArticlePage
        id={1}
        article={{
          id: 1,
          url: '/blog/article-1',
          title: 'Article 1',
          body: '<p>blurb</p>',
          images: {
            main: {
              url: 'http://main.jpg',
              description: 'main',
            },
          },
        }}
        location={{ pathname: '/blog/article-1', }}
      />
    );

    expect(wrapper.is('.article-page')).toBe(true);
    expect(wrapper.find('PageIntro').prop('title')).toBe('Article 1');
    expect(wrapper.find('.blurb').html()).toBe('<div class="blurb"><p>blurb</p></div>');
  });


  it('should render optional extras', () => {

    const wrapper = shallow(
      <ArticlePage
        id={1}
        article={{
          id: 1,
          url: '/blog/article-1',
          title: 'Article 1',
          body: '<p>blurb</p>',
          images: {
            main: {
              url: 'http://main.jpg',
              alt: 'main',
            },
          },
          date: new Date('2017-01-01T00:00:00.000Z'),
          location: 'London',
          event: {
            text: 'meetup',
            url: 'http://meetup',
          },
          downloads: [{
            url: 'http://download-1',
            text: 'download-1',
            icon: 'fa-download-1',
          }, {
            url: 'http://download-2',
            text: 'download-2',
            icon: 'fa-download-2',
          },],
        }}
        location={{ pathname: '/blog/article-1', }}
      />
    );

    expect(wrapper.is('.article-page')).toBe(true);
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
