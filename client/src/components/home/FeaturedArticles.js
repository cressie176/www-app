import React from 'react';
import PropTypes from 'prop-types';
import IconListItem from '../common/IconListItem';

import './FeaturedArticles.css';

const FeaturedArticles = ({ title, icon, articles, link, }) => {
  return (
    <div className='container featured-articles'>
      <div className='row'>
        <div className='col-md-12'>
          <h2 className='featured-articles__title'>
            <span className='icon'>
              <i className={`fa ${icon}`} aria-hidden='true'></i>
            </span>
            {title}
          </h2>
        </div>
      </div>
      <div className='row'>
        {
          articles.map(article => {
            return (
              <div key={article.id} className='col-md-4 featured-article'>
                <div className='featured-article__title__wrapper'>
                  <h3 className='featured-article__title'><a className='featured-article__title__link' href={article.url} dangerouslySetInnerHTML={{__html: article.title,}} /></h3>
                </div>
                <img className='featured-article__thumbnail' src={article.images.thumbnail.url} alt={article.title} />
                <div className='featured-article__summary' dangerouslySetInnerHTML={{__html: article.summary,}} />
                <hr className='featured-article__rule' />
                <ul className='featured-article__details'>
                  {
                    article.event ? (
                      <IconListItem icon='fa-group' text={article.event} url={article.url} type='event' />
                    ) : null
                  }
                  {
                    article.date ? (
                      <IconListItem icon='fa-calendar' text={article.date.toLocaleString()} type='date' />
                    ) : null
                  }
                  {
                    article.location ? (
                      <IconListItem icon='fa-location-arrow' text={article.location} type='location' />
                    ) : null
                  }
                  {
                    article.downloads ? (
                      article.downloads.map(download => {
                        return (
                          <IconListItem key={download.url} icon={download.icon} text={download.text} url={download.url} type='download' />
                        );
                      })
                    ) : null
                  }
                </ul>
              </div>
            );
          })
        }
      </div>

      {/* Disabled for MVP
      <div className='row'>
        <div className='col-md-12'>
          <div className='featured-articles__see-all-link'>
            <a href={link.url}>{link.text}</a>
          </div>
        </div>
      </div>
    */}
    </div>
  );
};

FeaturedArticles.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  articles: PropTypes.array,
  link: PropTypes.object,
};

export default FeaturedArticles;
