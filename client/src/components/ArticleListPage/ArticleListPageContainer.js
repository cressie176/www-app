import { connect, } from 'react-redux';
import { fetchArticles, } from '../../actions/articleActions';
import { fetchPage, } from '../../actions/pageActions';

import ArticleListPage from './ArticleListPage';

function mapStateToProps(state, props) {

  function byChannel(article) {
    return article.channel.id === props.id;
  }

  function byDateAndId(a, b) {
    return b.date.getTime() - a.date.getTime() || b.id - a.id;
  }

  return {
    page: state.page.data,
    ...state.page.meta,
    articleList: {
      data: state.articleList.data.filter(byChannel).sort(byDateAndId),
      meta: state.articleList.meta,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchArticles: channel => {
      dispatch(fetchArticles());
    },
    fetchPage: id => {
      dispatch(fetchPage(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListPage);
