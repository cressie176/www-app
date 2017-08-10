import React from 'react';
import PropTypes from 'prop-types';

import './LinksSpotlight.css';

const LinksSpotlight = ({title, type, links}) => (
  <div className={`links-spotlight links-spotlight--${type}`}>
    <h2 className='links-spotlight__title'>{title}</h2>
    <ul className='links-spotlight__list'>
      {
        links.map((link, index) => {
          return (
            <li key={index} className='links-spotlight__list__item'>
              <a className='links-spotlight__list__item__link' href={link.url}>
                {
                  link.icon ? <i className={`fa ${link.icon} links-spotlight__list__item__link__icon`} aria-hidden='true'></i> : null
                }
                <span className='links-spotlight__list__item__link__text'>
                  {link.text}
                </span>
              </a>
            </li>
          )
        })
      }
    </ul>
  </div>
)

LinksSpotlight.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  links: PropTypes.array,
}

export default LinksSpotlight;
