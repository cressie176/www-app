import React from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'react-redux';

export class FeatureToggle extends React.Component {
  render() {
    return this.props.enabled ? this.props.children : null;
  }
}

FeatureToggle.propTypes = {
  enabled: PropTypes.bool,
};

function mapStateToProps(state, props) {
  return {
    enabled: !!state.featureToggles[props.id],
  };
}

export default connect(mapStateToProps)(FeatureToggle);
