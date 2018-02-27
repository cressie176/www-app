import React from 'react';
import PropTypes from 'prop-types';

import IconListItem from '../IconListItem';

import './ArticleDetails.css';

const ArticleDetails = ({ event, date, location, downloads, }) => (
  <ul className='article-details'>
    {
      event ? (
        <IconListItem id='event' icon='fa-group' text={event.text} url={event.url} />
      ) : null
    }
    {
      date ? (
        <IconListItem id='date' icon='fa-calendar' text={date.toLocaleString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', })} />
      ) : null
    }
    {
      location ? (
        <IconListItem id='location' icon='fa-location-arrow' text={location} />
      ) : null
    }
    {
      downloads ? (
        downloads.map(download => {
          return (
            <IconListItem key={download.url} id='download' icon={download.icon} text={download.text} url={download.url} noFollow={true} />
          );
        })
      ) : null
    }
  </ul>
);

ArticleDetails.propTypes = {
  event: PropTypes.object,
  date: PropTypes.instanceOf(Date),
  location: PropTypes.string,
  downloads: PropTypes.array,
};

export default ArticleDetails;
