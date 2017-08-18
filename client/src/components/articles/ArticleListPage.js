import React from 'react';
import PropTypes from 'prop-types';
import content from '../../content.js';
import PageIntro from '../common/PageIntro';
import { Link, } from 'react-router-dom';

import './ArticleListPage.css';
const articles = Object.keys(content.talks).map(id => content.talks[id]);
const more = true;

const ArticleListPage = ({ page, }) => (
  <div className='article-list-page'>
    <ArticleList  articles={articles} />
  </div>
);

ArticleListPage.propTypes = {
  page: PropTypes.object,
};

const ArticleList = ({ articles, }) => (
  <div>
    <PageIntro
      title='"Someone is wrong on the internet."'
      citation={
        {
          url: 'https://xkcd.com/386/',
          text: 'Duty Class - xkcd',
        }
      }
      image={
        {
          url: 'https://imgs.xkcd.com/comics/duty_calls.png',
          title: 'It\'s Me!',
        }
      }
    />
    <div className='article-list'>
      {
        articles.map(article => {
          return (
            <div key={article.id} className='article-list__article'>
              <div className='row'>
                <div className='col-md-offset-1 col-md-3 no-min-height'>
                  <img className='article-list__article__thumbnail' src={article.images.thumbnail.url} alt={article.title} />
                </div>
                <div className='col-md-5 no-min-height'>
                  <h2 className='article-list__article__title'><Link to={article.url}>{article.title}</Link></h2>
                  <div dangerouslySetInnerHTML={{__html: article.summary,}} />
                </div>
              </div>
            </div>
          );
        })
      }
    </div>
    <div className='row'>
      <div className='col-md-offset-4 col-md-8'>
        <div className='article-list-controls'>
          {
            more && <button className='article-list-controls__load-more-button'>Load More</button>
          }
        </div>
      </div>
    </div>
  </div>
);

export default ArticleListPage;
