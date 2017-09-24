import { connect, } from 'react-redux';
import { fetchArticle, } from '../../actions/articleActions';
import { withRouter, } from 'react-router';

import ArticlePage from './ArticlePage';

function mapStateToProps(state, props) {
  return {
    article: state.article.data,
    ...state.article.meta,
    path: props.location.pathname,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchArticle: id => {
      dispatch(fetchArticle(id));
    },
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticlePage));
