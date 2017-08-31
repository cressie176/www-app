import React from 'react';
import PropTypes from 'prop-types';
import PageIntro from '../common/PageIntro';
import ArticleList from './ArticleList';
import ErrorPage from '../error/ErrorPage';
import { connect, } from 'react-redux';
import { fetchArticles, } from '../../actions/articleActions';
import { fetchPage, } from '../../actions/pageActions';


import './ArticleListPage.css';

export class ArticleListPage extends React.Component {

  componentDidMount() {
    this.props.fetchPage(this.props.id);
    this.props.fetchArticles();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.props.fetchPage(nextProps.id);
      this.props.fetchArticles(nextProps.id);
    }
  }

  render() {
    if (this.props.page.error) {
      return (
        <ErrorPage title='Error loading page' />
      );
    } else {
      return (
        <div className={`article-list-page article-list-page--${this.props.id}`}>

          <PageIntro title={this.props.page.title} citation={this.props.page.citation} image={this.props.page.image}/>

          <ArticleList articles={this.props.filteredArticles} loading={this.props.articles.loading} error={this.props.articles.error} />

        </div>
      );
    }
  }
}

ArticleListPage.propTypes = {
  id: PropTypes.string,
  page: PropTypes.object,
  articles: PropTypes.object,
  filteredArticles: PropTypes.array,
};

function mapStateToProps(state, props) {

  function toArticle(id) {
    return state.articles.items[id];
  }

  function byChannel(article) {
    return article.channel === props.id;
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
