import React from 'react';
import PropTypes from 'prop-types';

class FeaturedProject extends React.Component {

  componentDidMount() {
    this.props.fetchProject(this.props.id);
    this.props.fetchDownloadCount(this.props.id);
  }

  render() {

    if (this.props.project.error) {
      return (
        <li className='list-group-item featured-project featured-project--error'>
          <i className='fa fa-exclamation-triangle icon-text' aria-hidden='true'></i>
          <span className='featured-project__link'>Error loading module</span>
        </li>
      );
    } else if (this.props.project.missing) {
      return (
        <li className='list-group-item featured-project featured-project--missing'>
          <i className='fa fa-chain-broken icon-text' aria-hidden='true'></i>
          <span className='featured-project__link'>Module not found</span>
        </li>
      );
    } else if (this.props.project.loading) {
      return (
        <li className='list-group-item featured-project featured-project--loading'>
          <span className='featured-project__link'>Loading…</span>
          <span className='featured-project__downloads featured-project__downloads--loading'>
            <i className='fa fa-spinner fa-spin text-icon' aria-hidden='true'></i>
          </span>
          <div></div>
        </li>
      );
    } else if (!this.props.project.id) {
      return (
        <li className='list-group-item featured-project' />
      );
    } else {
      return (
        <li className='list-group-item featured-project'>
          <a className='featured-project__link' href={this.props.project.url}>{this.props.project.title}</a>
          {(() => {
            if (this.props.project.downloads_loading) {
              return <span className='featured-project__downloads featured-project__downloads--loading'>
                <i className='fa fa-spinner fa-spin text-icon' aria-hidden='true'></i>
              </span>;
            } else if (this.props.project.downloads_missing) {
              return <span className='featured-project__downloads featured-project__downloads--missing'>
                <i className='fa fa-chain-broken text-icon' aria-hidden='true'></i>
              </span>;
            } else if (this.props.project.downloads_error) {
              return <span className='featured-project__downloads featured-project__downloads--error'>
                <i className='fa fa-exclamation-triangle text-icon' aria-hidden='true' title={this.props.project.downloads_error.message}></i>
              </span>;
            } else if (this.props.project.downloads) {
              return <span className='featured-project__downloads featured-project__downloads--loaded'>
                {this.props.project.downloads.toLocaleString()}
                <i className='fa fa-download text-icon' aria-hidden='true' title={`${this.props.project.downloads.toLocaleString()} downloads per month`}></i>
              </span>;
            }
          })()}
          <div>{this.props.project.summary}</div>
        </li>
      );
    }
  }
}

FeaturedProject.propTypes = {
  id: PropTypes.string,
  project: PropTypes.object,
};

export default FeaturedProject;
