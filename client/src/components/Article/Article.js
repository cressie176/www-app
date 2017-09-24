import React from 'react';
import PropTypes from 'prop-types';

import ArticleDetails from '../ArticleDetails';

import './Article.css';

const Article = ({ id, title, body, event, date, location, downloads, }) => (
  <div className={`article article--${id}`}>
    <div className='article__body' dangerouslySetInnerHTML={{__html: body,}} />
    <ArticleDetails { ...{event, date, location, downloads,} } />
  </div>
);

Article.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  body: PropTypes.string,
  event: PropTypes.object,
  date: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
  location: PropTypes.string,
  downloads: PropTypes.array,
};

export default Article;
