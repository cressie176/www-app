import { connect, } from 'react-redux';
import get from 'lodash.get';

import { fetchDownloadCount, } from '../../actions/projectActions';
import FeaturedProject from './FeaturedProject';

function mapStateToProps(state, props) {
  return {
    stats: get(state, `project.${props.id}.stats`),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchDownloadCount: (id) => {
      dispatch(fetchDownloadCount(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedProject);
