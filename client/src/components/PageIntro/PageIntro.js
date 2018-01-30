import React from 'react';
import PropTypes from 'prop-types';

import './PageIntro.css';

const PageIntro = ({ icon, title, text, link, image, }) => (
  <div className='page-intro__wrapper full-width gutter'>
    <div className='page-intro'>
      <div className='row'>
        <div className='col-md-offset-1 col-md-8'>
          <div className='page-intro__details'>
            <h1 className='page-intro__title' >
              { icon && <i className={`fa ${icon} icon-text`} aria-hidden='true'></i> }
              {text || title}
            </h1>
            { link ? <a className='page-intro__citation' href={link.url} >~ {link.text}</a> : null }
          </div>
        </div>
        {
          image ?
          (
            <div className='col-md-2'>
              <img className='page-intro__image' title={image.title} alt={image.description} src={image.url}/>
            </div>
          ) : null
        }
      </div>
    </div>
  </div>
);

PageIntro.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  link: PropTypes.object,
  image: PropTypes.object,
};

export default PageIntro;
