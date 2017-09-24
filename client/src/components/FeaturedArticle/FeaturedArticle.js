import React from 'react';
import PropTypes from 'prop-types';
import { Link, } from 'react-router-dom';

import IconListItem from '../IconListItem';

import './FeaturedArticle.css';

const FeaturedArticle = ({id, title, url, summary, images, event, date, location, downloads, }) => (
  <div className='featured-article'>
    <div className='col-md-4'>
      <div className='featured-article__title__wrapper'>
        <h3 className='featured-article__title'><Link className='featured-article__title__link' to={url} dangerouslySetInnerHTML={{__html: title,}} /></h3>
      </div>
      <Link to={url}>
        <img className='featured-article__thumbnail' src={images.thumbnail.url} title={images.thumbnail.title} alt={images.thumbnail.description} />
      </Link>
      <div className='featured-article__summary' dangerouslySetInnerHTML={{__html: summary,}} />
      <ul className='featured-article__details'>
        {
          event ? (
            <IconListItem id='event' icon='fa-group' text={event.text} url={event.url} />
          ) : null
        }
        {
          date ? (
            <IconListItem id='date' icon='fa-calendar' text={new Date(date).toLocaleString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', })} />
          ) : null
        }
        {
          location ? (
            <IconListItem id='location' icon='fa-location-arrow' text={location} />
          ) : null
        }
      </ul>
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
  downloads: PropTypes.array,
};

export default FeaturedArticle;
