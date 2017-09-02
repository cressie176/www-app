import React from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'react-redux';
import { fetchPage, } from '../../actions/pageActions';

import Profile from './Profile';
import FeaturedArticles from './FeaturedArticles';
import FeaturedProjects from './FeaturedProjects';
import FeatureToggle from '../common/FeatureToggle';

import './HomePage.css';

class HomePage extends React.Component {

  componentWillMount() {
    this.props.fetchPage('home');
  }

  render() {
    if (this.props.page.id !== 'home' || this.props.page.loading) {
      return <div className='page home-page' />;
    } else {
      return (
        <div className='page home-page'>
          <div className='row'>
            <img className='hero' title={this.props.page.heroImage.title} alt={this.props.page.heroImage.description} src={this.props.page.heroImage.url} />
          </div>
          <div className='row'>
            <div className='col-md-offset-1 col-md-5 no-min-height'>
              <FeatureToggle id='profile'>
                <Profile
                  profile={this.props.page.profile}
                />
              </FeatureToggle>
            </div>
            <div className='col-md-5 no-min-height'>
              <FeatureToggle id='featuredProjects'>
              {
                <FeaturedProjects projects={this.props.page.featuredSoftware} />
              }
              </FeatureToggle>
            </div>
          </div>
          <FeatureToggle id='featuredArticles'>
          {
            <FeaturedArticles articles={this.props.page.featuredArticles} />
          }
          </FeatureToggle>
          <FeatureToggle id='featuredTalks'>
          {
            <FeaturedArticles articles={this.props.page.featuredTalks} />
          }
          </FeatureToggle>
        </div>
      );
    }
  }
}

HomePage.propTypes = {
  page: PropTypes.object,
};

function mapStateToProps(state, props) {
  return {
    page: state.page,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPage: id => {
      dispatch(fetchPage(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
