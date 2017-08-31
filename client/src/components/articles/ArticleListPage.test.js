import React from 'react';
import { shallow, } from 'enzyme';
import { ArticleListPage, } from './ArticleListPage';

describe('ArticleListPage', () => {

  it('should render message on error', () => {
    const wrapper = shallow(
      <ArticleListPage
        page={{ error: new Error('Oh Noes!'), }}
      />
    );
    expect(wrapper.is('Connect(ErrorPage)')).toBe(true);
    expect(wrapper.prop('title')).toBe('Error loading page');
  });

  it('should advise while articles are loading', () => {
    const wrapper = shallow(
      <ArticleListPage
        page={{ title: 'Article List', }}
        articles={{ loading: true, }}
        filteredArticles={[]}
      />
    );
    expect(wrapper.is('.article-list-page')).toBe(true);
    expect(wrapper.find('PageIntro').prop('title')).toBe('Article List');
    expect(wrapper.find('ArticleList').exists()).toBe(true);
    expect(wrapper.find('ArticleList').prop('articles').length).toBe(0);
    expect(wrapper.find('ArticleList').prop('loading')).toBe(true);
  });

  it('should advise if articles errored while loading', () => {
    const wrapper = shallow(
      <ArticleListPage
        page={{ title: 'Article List', }}
        articles={{ error: new Error('Oh Noes!'), }}
        filteredArticles={[]}
      />
    );
    expect(wrapper.is('.article-list-page')).toBe(true);
    expect(wrapper.find('PageIntro').prop('title')).toBe('Article List');
    expect(wrapper.find('ArticleList').exists()).toBe(true);
    expect(wrapper.find('ArticleList').prop('articles').length).toBe(0);
    expect(wrapper.find('ArticleList').prop('error')).toBeDefined();
  });


  it('should render filtered articles', () => {
    const wrapper = shallow(
      <ArticleListPage
        page={{ title: 'Article List', }}
        articles={{ error: new Error('Oh Noes!'), }}
        filteredArticles={[ 1, 2, 3, ]}
      />
    );
    expect(wrapper.is('.article-list-page')).toBe(true);
    expect(wrapper.find('PageIntro').prop('title')).toBe('Article List');
    expect(wrapper.find('ArticleList').exists()).toBe(true);
    expect(wrapper.find('ArticleList').prop('articles').length).toBe(3);
  });

});
