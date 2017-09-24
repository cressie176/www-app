import React from 'react';
import PropTypes from 'prop-types';
import { Link, } from 'react-router-dom';

import ArticleDetails from '../ArticleDetails';

import './FeaturedArticle.css';

const FeaturedArticle = ({id, title, url, summary, images, event, date, location, }) => (
  <div className='featured-article'>
    <div className='col-md-4'>
      <div className='featured-article__title__wrapper'>
        <h3 className='featured-article__title'><Link className='featured-article__title__link' to={url} dangerouslySetInnerHTML={{__html: title,}} /></h3>
      </div>
      <Link to={url}>
        <img className='featured-article__thumbnail' src={images.thumbnail.url} title={images.thumbnail.title} alt={images.thumbnail.description} />
      </Link>
      <div className='featured-article__summary' dangerouslySetInnerHTML={{__html: summary,}} />
      <ArticleDetails { ...{event, date, location, } } />
    </div>
  </div>
);

FeaturedArticle.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  event: PropTypes.object,
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  location: PropTypes.string,
};

export default FeaturedArticle;
