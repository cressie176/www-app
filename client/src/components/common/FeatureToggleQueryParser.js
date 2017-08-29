import React from 'react';
import { connect, } from 'react-redux';
import { withRouter, } from 'react-router';
import { toggleFeatures, } from '../../actions/featureToggleActions';
import 'url-search-params-polyfill';

export class FeatureToggleQueryParser extends React.Component {
  componentWillMount() {
    const features = new URLSearchParams(this.props.location.search).getAll('feature').reduce((features, token) => {
      const [name, value = 'on', ] = token.split(/=/);
      features[name] = value === 'on' ? true : false;
      return features;
    }, {});
    if (Object.keys(features).length) this.props.toggleFeatures(features);
  }
  render() {
    return null;
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    toggleFeatures: (features) => {
      dispatch(toggleFeatures(features));
    },
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FeatureToggleQueryParser));
