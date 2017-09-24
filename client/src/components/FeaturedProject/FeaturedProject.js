import React from 'react';
import PropTypes from 'prop-types';

import './FeaturedProject.css';

class FeaturedProject extends React.Component {

  componentDidMount() {
    this.props.fetchDownloadCount(this.props.id);
  }

  render() {

    const { id, url, title, summary, stats = { data: {}, meta: {}, }, } = this.props;

    return (
      <li className={`list-group-item featured-project featured-project--${id}`}>
        <a className='featured-project__link' href={url}>{title}</a>
        {(() => {
          const { loading = true, error, } = stats.meta;
          const { downloads = 0, } = stats.data;

          if (loading) {
            return <span className='featured-project__stats featured-project__stats--loading'>
              <i className='fa fa-spinner fa-spin text-icon' aria-hidden='true'></i>
            </span>;
          } else if (error) {
            return <span className='featured-project__stats featured-project__stats--error'>
              <i className='fa fa-exclamation-triangle text-icon' aria-hidden='true' title='Error loading stats'></i>
            </span>;
          } else if (downloads) {
            return <span className='featured-project__stats featured-project__stats--loaded'>
              {downloads.toLocaleString()}
              <i className='fa fa-download text-icon' aria-hidden='true' title={`${downloads.toLocaleString()} downloads per month`}></i>
            </span>;
          }
        })()}
        <div>{summary}</div>
      </li>
    );
  }
}

FeaturedProject.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  stats: PropTypes.object,
};

export default FeaturedProject;
