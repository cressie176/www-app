import React from 'react';
import PropTypes from 'prop-types';
import PageIntro from '../common/PageIntro';
import ArticleList from './ArticleList';
import { connect, } from 'react-redux';
import { fetchArticles, } from '../../actions/channelActions';

import './ArticleListPage.css';

class ArticleListPage extends React.Component {

  componentDidMount() {
    this.props.fetchArticles(this.props.page.channel);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.page.channel !== this.props.page.channel) {
      this.props.fetchArticles(nextProps.page.channel);
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

        <ArticleList articles={this.props.channel.articles.items} />

        <div className='row'>
          <div className='col-md-offset-4 col-md-8'>
            <div className='article-list-controls'>
              {
                this.props.channel.articles.truncated && <button className='article-list-controls__load-more-button'>Load More</button>
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
  channel: PropTypes.object,
};

function mapStateToProps(state, props) {
  return {
    channel: state.channels[props.page.channel] || { articles: { items: [], total: 0, }, },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchArticles: (channel) => {
      dispatch(fetchArticles(channel));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListPage);
