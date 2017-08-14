import React from 'react';
import PropTypes from 'prop-types';
import FeaturedProject from './FeaturedProject';
import './FeaturedProjects.css';

const FeaturedProjects = ({ title, icon, projects, link, }) => {
  return (
    <div className='featured-projects'>
      <h2>
        <span className='icon'>
          <i className={`fa ${icon}`} aria-hidden='true'></i>
        </span>
        {title}
      </h2>
      <ul className='list-group featured-projects__list'>
        {
          projects.map(project => {
            return (
              <FeaturedProject
                key={project.id}
                id={project.id}
                title={project.title}
                url={project.url}
                summary={project.summary}
              />
            );
          })
        }
      </ul>
      {/* Disabled for MVP
      <div className='featured-projects__see-all-link'>
        <a href={link.url}>{link.text}</a>
      </div>
      */}
    </div>
  );
};

FeaturedProjects.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  projects: PropTypes.array,
  link: PropTypes.object,
};

export default FeaturedProjects;
