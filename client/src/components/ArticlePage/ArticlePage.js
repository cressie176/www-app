import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, } from 'react-router-dom';

import PageIntro from '../PageIntro';
import Article from '../Article';
import ErrorPageContainer from '../ErrorPage';
import SocialButtons from '../SocialButtons';

import './ArticlePage.css';

class ArticlePage extends React.Component {

  componentDidMount() {
    this.props.fetchArticle(this.props.id);

    this.socialInterval = setInterval(() => {

      const element = document.getElementById('social-buttons');
      if (!element) return;
      if (!window.FB) return;
      if (!window.twttr) return;

      clearInterval(this.socialInterval);

      window.FB.XFBML.parse();
      window.twttr.widgets.load(
        document.getElementById("twitter")
      );
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.socialInterval);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.props.fetchArticle(nextProps.id);
    }
  }

  render() {
    if (this.props.error) {
      return (
        <ErrorPageContainer title='Error loading article' />
      );
    } else if (this.props.missing) {
      return (
        <ErrorPageContainer title='Page Not Found' />
      );
    } else if (this.props.loading) {
      return (
        <div className='article-page'>
          <PageIntro icon='fa-spinner fa-spin' title='Loading…' />
        </div>
      );
    } else if (!this.props.article.id) {
      return (
        <div className='article-page'/>
      );
    } else if (this.props.article.id === this.props.id && this.props.article.url !== this.props.location.pathname) {
      return (
        <Redirect to={this.props.article.url} />
      );
    }
    else {
      return (
        <div className='article-page'>
          <PageIntro title={this.props.article.title} />
          <Article {...this.props.article} />
          <SocialButtons tweet={this.props.article.tweetText} username='cressie176' />
        </div>
      );
    }
  }
}

ArticlePage.propTypes = {
  id: PropTypes.number,
  article: PropTypes.object,
  loading: PropTypes.bool,
  missing: PropTypes.bool,
  error: PropTypes.object,
};

export default ArticlePage;
