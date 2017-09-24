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

    const { id, article, path, loading, missing, error, } = this.props;

    if (error) {
      return (
        <ErrorPageContainer title='Error loading article' />
      );
    } else if (missing) {
      return (
        <ErrorPageContainer title='Page Not Found' />
      );
    } else if (article.id === id && article.url !== path) {
      return (
        <Redirect to={article.url} />
      );
    } else if (loading) {
      return (
        <PageIntro icon='fa-spinner fa-spin' title='Loading…' />
      );
    } else {
      return (
        <div className='article-page'>
          <PageIntro title={article.title} />
          <div className='row'>
            <div className='col-sm-offset-1 col-sm-10'>
              <Article {...article} />
              <SocialButtons tweet={article.tweetText} username='cressie176' />
            </div>
          </div>
        </div>
      );
    }
  }
}

ArticlePage.propTypes = {
  id: PropTypes.number.isRequired,
  article: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  missing: PropTypes.bool,
  error: PropTypes.object,
};

export default ArticlePage;
