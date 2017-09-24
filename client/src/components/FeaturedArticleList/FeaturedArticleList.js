import React from 'react';
import PropTypes from 'prop-types';
import { Link, } from 'react-router-dom';

import FeaturedArticle from '../FeaturedArticle';

import './FeaturedArticleList.css';

const FeaturedArticleList = ({ featuredArticleList, }) => (
  <div className='featured-articles'>
    <div className='row'>
      <div className='col-md-offset-1 col-md-10'>
        <h2 className='featured-articles__title'>
          <span className='icon'>
            <i className={`fa ${featuredArticleList.icon}`} aria-hidden='true'></i>
          </span>
          {featuredArticleList.title}
        </h2>
      </div>
    </div>
    <div className='row'>
      <div className='col-md-offset-1 col-md-10'>
        <div className='row'>
          {
            featuredArticleList.items.map(article => {
              return <FeaturedArticle key={article.id} {...article} />;
            })
          }
        </div>
      </div>
    </div>
    {
      <div className='row'>
        <div className='col-md-offset-1 col-md-10'>
          <div className='featured-articles__see-all-link'>
            <Link to={featuredArticleList.link.url}>{featuredArticleList.link.text}</Link>
          </div>
        </div>
      </div>
    }
  </div>
);

FeaturedArticleList.propTypes = {
  featuredArticleList: PropTypes.object.isRequired,
};

export default FeaturedArticleList;
