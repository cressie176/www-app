import React from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'react-redux';
import { fetchDownloadCount, } from '../../actions/softwareActions';

export class FeaturedProject extends React.Component {
  componentDidMount() {
    this.props.fetchDownloadCount(this.props.id);
  }
  render() {
    return (
      <li key={this.props.id} className='list-group-item featured-project'>
        <a className='featured-project__link' href={this.props.url}>{this.props.title}</a>
        {
          this.props.downloads === undefined ? (
            <span className='featured-project__downloads featured-project__downloads--loading'>
              <i className='fa fa-spinner fa-spin featured-project__downloads__icon' aria-hidden='true'></i>
            </span>
          ) : (
            <span className='featured-project__downloads featured-project__downloads--loaded'>
              {this.props.downloads.toLocaleString()}<i className='fa fa-download featured-project__downloads__icon' aria-hidden='true'></i>
            </span>
          )
        }
        <div>{this.props.summary}</div>
      </li>
    );
  }
}

function mapStateToProps(state, props) {
  return { ...state.software[props.id], };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDownloadCount: (id) => {
      dispatch(fetchDownloadCount(id));
    },
  };
}

FeaturedProject.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  url: PropTypes.string,
  summary: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedProject);
