import React from 'react';
import PropTypes from 'prop-types';

import FeatureToggle from '../FeatureToggle/FeatureToggle';
import Profile from '../Profile';
import FeaturedProjectList from '../FeaturedProjectList';
import FeaturedArticleList from '../FeaturedArticleList';
import ErrorPage from '../ErrorPage';

import './HomePage.css';

class HomePage extends React.Component {

  componentDidMount() {
    this.props.fetchPage('home');
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.page && (nextProps.page.title || nextProps.page.error) ? true : false;
  }

  render() {

    const { page = {}, loading = false, missing = false, error, } = this.props;

    if (error) {
      return (
        <ErrorPage title='Error loading page' />
      );
    } else if (missing) {
      return (
        <ErrorPage title='Page Not Found' />
      );
    } else if (loading || !page.title) {
      return null;
    } else {
      return (
        <div className='page home-page'>
          {
            page.heroImage && (
              <div className='row'>
                <img className='hero' title={page.heroImage.title} alt={page.heroImage.description} src={page.heroImage.url} />
              </div>
            )
          }
          <div className='row'>
            <div className='col-md-offset-1 col-md-5 no-min-height'>
              <FeatureToggle id='profile'>
              {
                page.profile
                  ? <Profile profile={page.profile} />
                  : null
              }
              </FeatureToggle>
            </div>
            <div className='col-md-5 no-min-height'>
              <FeatureToggle id='featuredSoftware'>
              {
                page.featuredSoftware
                  ? <FeaturedProjectList featuredProjectList={page.featuredSoftware} />
                  : null
              }
              </FeatureToggle>
            </div>
          </div>
          <FeatureToggle id='featuredArticles'>
          {
            page.featuredArticles
              ? <FeaturedArticleList featuredArticleList={page.featuredArticles} />
              : null
          }
          </FeatureToggle>
          <FeatureToggle id='featuredTalks'>
          {
            page.featuredTalks
              ? <FeaturedArticleList featuredArticleList={page.featuredTalks} />
              : null
          }
          </FeatureToggle>
        </div>
      );
    }
  }
}

HomePage.propTypes = {
  page: PropTypes.object,
  loading: PropTypes.bool,
  missing: PropTypes.bool,
  error: PropTypes.object,
};

export default HomePage;
