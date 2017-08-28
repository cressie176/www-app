import React from 'react';
import PropTypes from 'prop-types';
import PageIntro from '../common/PageIntro';
import ArticleList from './ArticleList';
import { connect, } from 'react-redux';
import { fetchArticles, } from '../../actions/articlesActions';

import './ArticleListPage.css';

class ArticleListPage extends React.Component {

  componentWillMount() {
    this.props.fetchArticles();
  }

  render() {
    return (
      <div className='article-list-page'>

        <PageIntro
          title='"Someone is wrong on the internet."'
          citation={
            {
              url: 'https://xkcd.com/386/',
              text: 'Duty Calls - xkcd',
            }
          }
          image={
            {
              url: 'https://imgs.xkcd.com/comics/duty_calls.png',
              title: 'It\'s Me!',
            }
          }
        />

        <ArticleList articles={this.props.articles.items} />

        <div className='row'>
          <div className='col-md-offset-4 col-md-8'>
            <div className='article-list-controls'>
              {
                this.props.isTruncated && <button className='article-list-controls__load-more-button'>Load More</button>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ArticleListPage.propTypes = {
  page: PropTypes.object,
  articles: PropTypes.object,
};

function mapStateToProps(state, props) {
  return {
    articles: state.articles,
    isTruncated: state.articles.items.length < state.articles.total,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchArticles: () => {
      dispatch(fetchArticles());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListPage);
