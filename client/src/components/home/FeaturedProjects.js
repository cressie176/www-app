import React from 'react';
import PropTypes from 'prop-types';

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
              <li key={project.id} className='list-group-item featured-project'>
                <a href={project.url}>{project.title}</a>
                <span className='featured-project__downloads'>
                  {project.downloads.toLocaleString()}
                  <i className='fa fa-download featured-project__downloads__icon' aria-hidden='true'></i>
                </span>
                <div>{project.summary}</div>
              </li>
            );
          })
        }
      </ul>
      <div className='featured-projects__see-all-link'>
        <a href={link.url}>{link.text}</a>
      </div>
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
