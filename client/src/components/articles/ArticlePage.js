import React from 'react';
import PropTypes from 'prop-types';
import PageIntro from '../common/PageIntro';
import IconListItem from '../common/IconListItem';
import ErrorPage from '../error/ErrorPage';

import { connect, } from 'react-redux';
import { fetchArticle, } from '../../actions/articleActions';
import { withRouter, } from 'react-router';
import { Redirect,} from 'react-router-dom';

import './ArticlePage.css';

export class ArticlePage extends React.Component {

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
    if (this.props.article.error) {
      return (
        <ErrorPage title='Error loading article' />
      );
    } else if (this.props.article.missing) {
      return (
        <ErrorPage title='Page Not Found' />
      );
    } else if (this.props.article.loading) {
      return (
        <div className='article-page'>
          <PageIntro title='Loading…' />
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
          <div className='row'>
            <div className='col-sm-offset-1 col-sm-10'>
              <div className='blurb' dangerouslySetInnerHTML={{__html: this.props.article.body,}} />
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-offset-1 col-sm-10'>
              <ul className='featured-article__details'>
                {
                  this.props.article.event ? (
                    <IconListItem icon='fa-group' text={this.props.article.event.text} url={this.props.article.event.url} type='event' />
                  ) : null
                }
                {
                  this.props.article.date ? (
                    <IconListItem icon='fa-calendar' text={this.props.article.date.toLocaleString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', })} type='date' />
                  ) : null
                }
                {
                  this.props.article.location ? (
                    <IconListItem icon='fa-location-arrow' text={this.props.article.location} type='location' />
                  ) : null
                }
                {
                  this.props.article.downloads ? (
                    this.props.article.downloads.map(download => {
                      return (
                        <IconListItem key={download.url} icon={download.icon} text={download.text} url={download.url} type='download' />
                      );
                    })
                  ) : null
                }
              </ul>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-offset-1 col-sm-10'>
              <div id='social-buttons'>
                <span className="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button" data-action="like" data-size="large" data-show-faces="true" data-share="true"></span>
                <span id="twitter">
                  &nbsp;
                  <a className="twitter-share-button" href={`https://twitter.com/share?text=${this.props.article.tweetText}`} data-show-count="false" data-size="large">Tweet</a>
                  &nbsp;
                  <a className="twitter-follow-button" href="https://twitter.com/cressie176" data-show-count="false" data-size="large" data-show-screen-name="false">Follow</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

ArticlePage.propTypes = {
  id: PropTypes.number,
  article: PropTypes.object,
};

function mapStateToProps(state, props) {
  return {
    article: state.articles.items[props.id] || {},
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
