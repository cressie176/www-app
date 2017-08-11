import React from 'react';
import PropTypes from 'prop-types';
import IconListItem from './IconListItem'

import './LinksSpotlight.css';

const LinksSpotlight = ({title, type, links}) => (
  <div className={`links-spotlight links-spotlight--${type}`}>
    <h2 className='links-spotlight__title'>{title}</h2>
    <ul className='links-spotlight__list'>
      {
        links.map((link, index) => {
          return (
            <IconListItem icon={link.icon} key={index} text={link.text} url={link.url} type={type} />
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
