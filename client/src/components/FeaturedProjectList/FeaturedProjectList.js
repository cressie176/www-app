import React from 'react';
import PropTypes from 'prop-types';
import FeaturedProject from '../FeaturedProject';

import './FeaturedProjectList.css';

const FeaturedProjectList = ({ featuredProjectList, }) => (
  <div className='featured-projects'>
    <h2>
      <span className='icon'>
        <i className={`fa ${featuredProjectList.icon}`} aria-hidden='true'></i>
      </span>
      {featuredProjectList.title}
    </h2>
    <ul className='list-group featured-projects__list'>
      {
        featuredProjectList.items.map(project => {
          return <FeaturedProject key={project.id} {...project} />;
        })
      }
    </ul>
  </div>
);

FeaturedProjectList.propTypes = {
  featuredProjectList: PropTypes.object.isRequired,
};

export default FeaturedProjectList;
