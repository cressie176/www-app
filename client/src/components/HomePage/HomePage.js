import React from 'react';
import PropTypes from 'prop-types';

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
    const { page = {}, missing = false, error, } = this.props;

    if (error) {
      return (
        <ErrorPage title='Error loading page' />
      );
    } else if (missing) {
      return (
        <ErrorPage title='Page Not Found' />
      );
    } else {
      return (
        <div className='page home-page'>
          {
            page.heroImage && (
              <div className='row'>
                <img className='hero' title='Someone lying on a sofa writing code on a laptop' alt='Coding On The Sofa' src='https://images.contentful.com/g99n9a78vx0s/2U93BNINsIgIKccgSo2Ewi/33107dd33838f8a51986fea1306ae9a7/hero.jpg' />
              </div>
            )
          }
          <div className='row'>
            <div className='col-md-offset-1 col-md-5 no-min-height'>
              {
                page.profile
                  ? <Profile profile={page.profile} />
                  : null
              }
            </div>
            <div className='col-md-5 no-min-height'>
              {
                page.featuredSoftware
                  ? <FeaturedProjectList featuredProjectList={page.featuredSoftware} />
                  : null
              }
            </div>
          </div>
          {
            page.featuredArticles
              ? <FeaturedArticleList featuredArticleList={page.featuredArticles} />
              : null
          }
          {
            page.featuredTalks
                ? <FeaturedArticleList featuredArticleList={page.featuredTalks} />
                : null
          }
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
