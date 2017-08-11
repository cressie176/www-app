import React from 'react';
import PropTypes from 'prop-types';

import './IconListItem.css';

const IconListItem = ({icon, text, url, type}) => {
  if (icon && text && url) {
    return (
      <li className={`icon-list__item icon-list__item--${type}`}>
        <i className={`fa ${icon} icon-list__item__icon`} aria-hidden='true'></i>
        <a className='icon-list__item__link' href={url}>{text}</a>
      </li>
    )
  } else if (icon && text) {
    return (
      <li className={`icon-list__item icon-list__item--${type}`}>
        <i className={`fa ${icon} icon-list__item__icon`} aria-hidden='true'></i>
        <span className='icon-list__item__text'>{text}</span>
      </li>
    )
  } else if (icon && url) {
    return (
      <li className={`icon-list__item icon-list__item--${type}`}>
        <a className='icon-list__item__link' href={url}>
          <i className={`fa ${icon} icon-list__item__icon`} aria-hidden='true'></i>
        </a>
      </li>
    )
  } else if (text && url) {
    return (
      <li className={`icon-list__item icon-list__item--${type}`}>
        <a className='icon-list__item__link' href={url}>{text}</a>
      </li>
    )
  } else if (icon) {
    return (
      <li className={`icon-list__item icon-list__item--${type}`}>
        <i className={`fa ${icon} icon-list__item__icon`} aria-hidden='true'></i>
      </li>
    )
  } else if (text) {
    return (
      <li className={`icon-list__item icon-list__item--${type}`}>
        <span className='icon-list__item__text'>{text}</span>
      </li>
    )
  }
  return null
}

IconListItem.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
}

export default IconListItem
