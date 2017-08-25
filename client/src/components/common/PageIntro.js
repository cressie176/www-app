import React from 'react';
import PropTypes from 'prop-types';

import './PageIntro.css';

const PageIntro = ({ icon, title, citation, image, }) => (
  <div className='page-intro__wrapper full-width gutter'>
    <div className='page-intro'>
      <div className='row'>
        <div className='col-md-offset-1 col-md-8'>
          <h1 className='page-intro__title' >
            { icon && <i className={`fa ${icon} page-intro__icon`} aria-hidden='true'></i> }
            {title}
          </h1>
          { citation ? <a className='page-intro__citation' href='https://xkcd.com/386/' >{citation.text}</a> : null }
        </div>
        {
          image ?
          (
            <div className='col-md-2'>
              <img className='page-intro__image' title={image.title} alt='' src={image.url}/>
            </div>
          ) : null
        }
      </div>
    </div>
  </div>
);

PageIntro.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  citation: PropTypes.object,
  image: PropTypes.object,
};

export default PageIntro;
