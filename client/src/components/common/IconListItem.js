import React from 'react';
import PropTypes from 'prop-types';
import { Link, } from 'react-router-dom';

import './IconListItem.css';

const CustomLink = ({ url, className, children, }) => (
  url.startsWith('/') ? <Link className={className} to={url}>{children}</Link>
                      : <a className={className} href={url}>{children}</a>
);

const IconListItem = ({ icon, text, url, id, }) => {

  if (icon && text && url) {
    return (
      <li className={`icon-list__item icon-list__item--${id}`}>
        <i className={`fa ${icon} icon-text`} aria-hidden='true'></i>
        <CustomLink className={`icon-list__item__link`} url={url} >{text}</CustomLink>
      </li>
    );
  } else if (icon && text) {
    return (
      <li className={`icon-list__item icon-list__item--${id}`}>
        <i className={`fa ${icon} icon-text`} aria-hidden='true'></i>
        <span className='icon-list__item__text'>{text}</span>
      </li>
    );
  } else if (icon && url) {
    return (
      <li className={`icon-list__item icon-list__item--${id}`}>
        <CustomLink className={`icon-list__item__link`} url={url}>
          <i className={`fa ${icon}`} aria-hidden='true'></i>
        </CustomLink>
      </li>
    );
  } else if (text && url) {
    return (
      <li className={`icon-list__item icon-list__item--${id}`}>
        <CustomLink className={`icon-list__item__link`} url={url}>{text}</CustomLink>
      </li>
    );
  } else if (icon) {
    return (
      <li className={`icon-list__item icon-list__item--${id}`}>
        <i className={`fa ${icon}`} aria-hidden='true'></i>
      </li>
    );
  } else if (text) {
    return (
      <li className={`icon-list__item icon-list__item--${id}`}>
        <span className='icon-list__item__text'>{text}</span>
      </li>
    );
  }
  return null;
};

IconListItem.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
  obfuscate: PropTypes.bool,
};

export default IconListItem;
