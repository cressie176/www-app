import React from 'react';
import { shallow, } from 'enzyme';
import ArticleListPage from './ArticleListPage';

describe('ArticleListPage', () => {

  it('should render message on error', () => {
    const wrapper = shallow(
      <ArticleListPage
        id='blog'
        page={{ error: new Error('Oh Noes!'), }}
        articleList={{}}
      />
    );
    expect(wrapper.is('Connect(ErrorPage)')).toBe(true);
    expect(wrapper.prop('title')).toBe('Error loading page');
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
