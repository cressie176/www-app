import React from 'react';
import PropTypes from 'prop-types';
import FeaturedArticle from '../FeaturedArticle';
import { Link, } from 'react-router-dom';

import './FeaturedArticleList.css';

const FeaturedArticles = ({ articles = { items: [], link: {}, }, }) => {
  return (
    <div className='featured-articles'>
      <div className='row'>
        <div className='col-md-offset-1 col-md-10'>
          <h2 className='featured-articles__title'>
            <span className='icon'>
              <i className={`fa ${articles.icon}`} aria-hidden='true'></i>
            </span>
            {articles.title}
          </h2>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-offset-1 col-md-10'>
          <div className='row'>
            {
              articles.items.map((article, index) => {
                return <FeaturedArticle key={index} id={article.id} />;
              })
            }
          </div>
        </div>
      </div>
      {
        <div className='row'>
          <div className='col-md-offset-1 col-md-10'>
            <div className='featured-articles__see-all-link'>
              <Link to={articles.link.url}>{articles.link.text}</Link>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

FeaturedArticles.propTypes = {
  articles: PropTypes.object,
};

export default FeaturedArticles;
