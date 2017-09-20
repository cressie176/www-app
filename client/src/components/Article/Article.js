import React from 'react';
import PropTypes from 'prop-types';

import IconListItem from '../IconListItem';

const Article = ({ id, title, body, event, date, location, downloads, }) => (<div className={`article article--${id}`}>
    <div className='row'>
      <div className='col-sm-offset-1 col-sm-10'>
        <div className='blurb' dangerouslySetInnerHTML={{__html: body,}} />
      </div>
    </div>
    <div className='row'>
      <div className='col-sm-offset-1 col-sm-10'>
        <ul className='article__details'>
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
      </div>
    </div>
  </div>
);

Article.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
  event: PropTypes.object,
  date: PropTypes.object,
  location: PropTypes.string,
  downloads: PropTypes.array,
};

export default Article;
