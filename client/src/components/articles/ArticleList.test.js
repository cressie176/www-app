import React from 'react';
import { shallow, } from 'enzyme';
import ArticleList from './ArticleList';

describe('ArticleList', () => {

  it('should render message on error', () => {
    const wrapper = shallow(
      <ArticleList
        error={{ error: new Error('Oh Noes!'), }}
      />
    );
    expect(wrapper.is('.article-list')).toBe(true);
    expect(wrapper.find('.article-list__error__text').text()).toBe('Error loading articles');
  });

  it('should render message while loading articles', () => {
    const wrapper = shallow(
      <ArticleList
        loading={true}
      />
    );
    expect(wrapper.is('.article-list')).toBe(true);
    expect(wrapper.find('.article-list__loading__text').text()).toBe('Loading articles…');
  });

  it('should render articles', () => {
    const wrapper = shallow(
      <ArticleList
        articles={[
          {
            id: 1,
            title: 'Article 1',
            url: 'http://article-1',
            images: {
              thumbnail: {
                url: 'http://thumb-1.jpg',
                title: 'Thumb-1',
                description: 'thumb-1',
              },
            },
            summary: '<p>Article 1 Summary</p>',
            event: {
              text: 'what',
              url: 'https://what',
            },
            date: 'when',
            location: 'where',
            downloads: [
              {
                text: 'pdf',
                url: 'https://pdf',
              },
            ],
          },
          {
            id: 2,
            title: 'Article 2',
            url: 'http://article-2',
            images: {
              thumbnail: {
                url: 'http://thumb-2.jpg',
                title: 'Thumb-2',
                description: 'thumb-2',
              },
            },
            summary: '<p>Article 2 Summary</p>',
          },
        ]}
      />
    );
    expect(wrapper.is('.article-list')).toBe(true);
    expect(wrapper.find('.article-list__article').length).toBe(2);

    const article1 = wrapper.find('.article-list__article').first();
    expect(article1.find('.article-list__article__title Link').prop('to')).toBe('http://article-1');
    expect(article1.find('.article-list__article__thumbnail').prop('src')).toBe('http://thumb-1.jpg');
    expect(article1.find('.article-list__article__thumbnail').prop('alt')).toBe('thumb-1');
    expect(article1.find('.article-list__article__thumbnail').prop('title')).toBe('Thumb-1');
    expect(article1.find('.article-list__article__summary').html()).toBe('<div class="article-list__article__summary"><p>Article 1 Summary</p></div>');

    expect(article1.find('.featured-article__details IconListItem').length).toBe(3);
    expect(article1.find('.featured-article__details IconListItem').at(0).prop('id')).toBe('event');
    expect(article1.find('.featured-article__details IconListItem').at(0).prop('text')).toBe('what');
    expect(article1.find('.featured-article__details IconListItem').at(0).prop('url')).toBe('https://what');
    expect(article1.find('.featured-article__details IconListItem').at(1).prop('id')).toBe('date');
    expect(article1.find('.featured-article__details IconListItem').at(1).prop('text')).toBe('when');
    expect(article1.find('.featured-article__details IconListItem').at(2).prop('id')).toBe('location');
    expect(article1.find('.featured-article__details IconListItem').at(2).prop('text')).toBe('where');
  });

});
