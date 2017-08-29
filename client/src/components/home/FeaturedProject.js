import React from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'react-redux';
import { fetchProject, fetchDownloadCount, } from '../../actions/projectActions';

export class FeaturedProject extends React.Component {

  componentWillMount() {
    this.props.fetchProject(this.props.id);
    this.props.fetchDownloadCount(this.props.id);
  }

  render() {
    if (this.props.project.error) {
      return (
        <li className='featured-project--error' />
      );
    } else if (this.props.project.missing) {
      return (
        <li className='featured-project--not-found' />
      );
    } else if (this.props.project.loading) {
      return (
        <li className='featured-project--loading' />
      );
    } else if (!this.props.project.id) {
      return (
        <li className='featured-project' />
      );
    } else {
      return (
        <li className='list-group-item featured-project'>
          <a className='featured-project__link' href={this.props.project.url}>{this.props.project.title}</a>
          {
            this.props.project.downloads === undefined ? (
              <span className='featured-project__downloads featured-project__downloads--loading'>
                <i className='fa fa-spinner fa-spin featured-project__downloads__icon' aria-hidden='true'></i>
              </span>
            ) : (
              <span className='featured-project__downloads featured-project__downloads--loaded'>
                {this.props.project.downloads.toLocaleString()}<i className='fa fa-download featured-project__downloads__icon' aria-hidden='true'></i>
              </span>
            )
          }
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

function mapStateToProps(state, props) {
  return {
    project: state.projects[props.id] || {},
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchProject: (id) => {
      dispatch(fetchProject(id));
    },
    fetchDownloadCount: (id) => {
      dispatch(fetchDownloadCount(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedProject);
