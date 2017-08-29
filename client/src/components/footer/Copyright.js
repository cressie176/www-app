import React from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'react-redux';

import './Copyright.css';

export class Copyright extends React.Component {

  render() {
    return (
      <div className='copyright gutter'>
        <div className='row'>
          <div className='col-sm-offset-1 col-sm-10'>
            <span className='text'><span className='text-nowrap'>&copy; {this.props.year} {this.props.owner}.</span> <span className='text-nowrap'>{this.props.rights}</span></span>
          </div>
        </div>
      </div>
    );
  }
}

Copyright.propTypes = {
  year: PropTypes.number,
  owner: PropTypes.string,
  rights: PropTypes.string,
};

function mapStateToProps(state, props) {
  return {
    ...state.site.copyright,
  };
}

export default connect(mapStateToProps)(Copyright);

