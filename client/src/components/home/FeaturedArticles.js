import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './FeaturedArticles.css';

const FeaturedArticles = ({ title, icon, articles, link }) => {
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
                  <h3 className='featured-article__title'>{article.title}</h3>
                </div>
                <img className='featured-article__thumbnail' src={article.images.thumbnail.url} alt={article.title} />
                <div className='featured-article__summary'  dangerouslySetInnerHTML={{__html: article.summary}} />
                <ul className='featured-article__details'>
                  {
                    article.event ? (
                      <li className='featured-article__event'>
                        <i className='fa fa-group' aria-hidden='true'></i>
                        {article.event}
                      </li>
                    ) : null
                  }
                  {
                    article.location ? (
                      <li className='featured-article__location'>
                        <i className='fa fa-location-arrow' aria-hidden='true'></i>
                        {article.location}
                      </li>
                    ) : null
                  }
                  {
                    article.date ? (
                      <li className='featured-article__date'>
                        <i className='fa fa-calendar' aria-hidden='true'></i>
                        {article.date.toLocaleString()}
                      </li>
                    ) : null
                  }
                  {
                    article.downloads ? (
                      article.downloads.map(download => {
                        return (
                          <li key={download.url} className='featured-article__downloads'>
                            <i className={`fa ${download.icon}`} aria-hidden='true'></i>
                            <a href={download.url}>{download.linkText}</a>
                          </li>
                        )
                      })
                    ) : null
                  }
                </ul>
              </div>
            )
          })
        }
      </div>
      <div className='row'>
        <div className='col-md-12'>
          <div className='featured-articles__see-all-link'>
            <Link to={link.url}>{link.text}</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

FeaturedArticles.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  articles: PropTypes.array,
  link: PropTypes.object,
}

export default FeaturedArticles
