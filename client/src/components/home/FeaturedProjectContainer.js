import { connect, } from 'react-redux';
import { fetchProject, fetchDownloadCount, } from '../../actions/projectActions';
import FeaturedProject from './FeaturedProject';

function mapStateToProps(state, props) {
  return {
    project: state.projects.items[props.id] || {},
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
