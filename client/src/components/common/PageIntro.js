import React from 'react';
import PropTypes from 'prop-types';

const PageIntro = ({ title, citation, image, }) => (
  <div className='page-intro__wrapper full-width gutter'>
    <div className='page-intro'>
      <div className='row'>
        <div className='col-md-offset-1 col-md-8'>
          <h1 className='page-intro__title' >{title}</h1>
          <a className='page-intro__citation' href='https://xkcd.com/386/' >{citation.text}</a>
        </div>
        <div className='col-md-2'>
          <img className='page-intro__image' title={image.title} alt={citation.text} src={image.url}/>
        </div>
      </div>
    </div>
  </div>
);

PageIntro.propTypes = {
  title: PropTypes.string,
  citation: PropTypes.object,
  image: PropTypes.object,
};

export default PageIntro;
