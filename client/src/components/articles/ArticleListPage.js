import React from 'react';
import PropTypes from 'prop-types';
import PageIntro from '../common/PageIntro';
import ArticleList from './ArticleList';
import { connect, } from 'react-redux';
import { fetchArticles, } from '../../actions/articleActions';
import { fetchPage, } from '../../actions/pageActions';


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

  render() {
    return (
      <div className='article-list-page'>

        <PageIntro
          title={this.props.page.title}
          citation={this.props.page.citation}
          image={this.props.page.image}
        />

        <ArticleList articles={this.props.articles} />

        <div className='row'>
          <div className='col-md-offset-4 col-md-8'>
            <div className='article-list-controls'>
              {
                false && <button className='article-list-controls__load-more-button'>Load More</button>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ArticleListPage.propTypes = {
  id: PropTypes.string,
  page: PropTypes.object,
};

function mapStateToProps(state, props) {

  function toArticle(id) {
    return state.articles[id];
  }

  function byChannel(article) {
    return article.channel === props.id;
  }

  function byDateAndId(a, b) {
    return b.date.getTime() - a.date.getTime() || b.id - a.id;
  }

  return {
    page: state.page,
    articles: Object.keys(state.articles || []).map(toArticle).filter(byChannel).sort(byDateAndId),
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
