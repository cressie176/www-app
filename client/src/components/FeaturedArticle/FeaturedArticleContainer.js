import { connect, } from 'react-redux';
import { fetchArticle, } from '../../actions/articleActions';
import FeaturedArticle from './FeaturedArticle';

function mapStateToProps(state, props) {
  return {
    article: state.articles.items[props.id] || {},
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchArticle: (id) => {
      dispatch(fetchArticle(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedArticle);
