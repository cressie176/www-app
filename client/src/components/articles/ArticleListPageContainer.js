import { connect, } from 'react-redux';
import { fetchArticles, } from '../../actions/articleActions';
import { fetchPage, } from '../../actions/pageActions';

import ArticleListPage from './ArticleListPage';

function mapStateToProps(state, props) {

  function toArticle(id) {
    return state.articles.items[id];
  }

  function byChannel(article) {
    return article.channel.id === props.id;
  }

  function byDateAndId(a, b) {
    return b.date.getTime() - a.date.getTime() || b.id - a.id;
  }

  return {
    page: state.page,
    articles: state.articles,
    filteredArticles: Object.keys(state.articles.items || {}).map(toArticle).filter(byChannel).sort(byDateAndId),
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
