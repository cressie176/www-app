import React from 'react';
import { shallow, } from 'enzyme';
import ArticleListPage from './ArticleListPage';

describe('Article List Page', () => {

  it('should render message on error', () => {
    const wrapper = shallow(
      <ArticleListPage
        id='blog'
        error={new Error('Oh Noes!')}
        page={{}}
        articleList={{}}
      />
    );

    expect(wrapper.is('Connect(ErrorPage)')).toBe(true);
    expect(wrapper.prop('title')).toBe('Error loading page');
  });

  it('should render message on not found', () => {
    const wrapper = shallow(
      <ArticleListPage
        id='blog'
        missing={true}
        page={{}}
        articleList={{}}
      />
    );

    expect(wrapper.is('Connect(ErrorPage)')).toBe(true);
    expect(wrapper.prop('title')).toBe('Page Not Found');
  });

  it('should render while loading', () => {
    const wrapper = shallow(
      <ArticleListPage
        id='blog'
        loading={true}
        page={{}}
        articleList={{}}
      />
    );
    expect(wrapper.is('.article-list-page')).toBe(true);
  });

  it('should advise while articles are loading', () => {
    const wrapper = shallow(
      <ArticleListPage
        id='blog'
        page={{ title: 'Article List', }}
        articleList={{
          meta: {
            loading: true,
          },
        }}
      />
    );
    expect(wrapper.is('.article-list-page')).toBe(true);
    expect(wrapper.find('PageIntro').prop('title')).toBe('Article List');
    expect(wrapper.find('ArticleList').exists()).toBe(true);
    expect(wrapper.find('ArticleList').prop('loading')).toBe(true);
  });

  it('should advise if articles errored while loading', () => {
    const wrapper = shallow(
      <ArticleListPage
        id='blog'
        page={{ title: 'Article List', }}
        articleList={{
          meta: {
            error: new Error('Oh Noes!'),
          },
        }}
      />
    );
    expect(wrapper.is('.article-list-page')).toBe(true);
    expect(wrapper.find('PageIntro').prop('title')).toBe('Article List');
    expect(wrapper.find('ArticleList').exists()).toBe(true);
    expect(wrapper.find('ArticleList').prop('error')).toBeDefined();
  });

});
