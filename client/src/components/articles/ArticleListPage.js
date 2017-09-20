import React from 'react';
import PropTypes from 'prop-types';
import PageIntro from '../common/PageIntro';
import ArticleList from './ArticleList';
import ErrorPageContainer from '../error/ErrorPageContainer';

import './ArticleListPage.css';

class ArticleListPage extends React.Component {

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

  shouldComponentUpdate(nextProps) {
    return nextProps.page && (nextProps.page.title || nextProps.page.error) ? true : false;
  }

  render() {
    if (this.props.page.error) {
      return (
        <ErrorPageContainer title='Error loading page' />
      );
    } else {
      return (
        <div className={`article-list-page article-list-page--${this.props.id}`}>

          <PageIntro title={this.props.page.title} text={this.props.page.introText} link={this.props.page.introLink} image={this.props.page.introImage}/>

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

export default ArticleListPage;
