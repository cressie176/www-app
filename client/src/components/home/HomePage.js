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

  shouldComponentUpdate(nextProps) {
    return nextProps.page && (nextProps.page.title || nextProps.page.error) ? true : false;
  }

  render() {
    if (this.props.page.id !== 'home' || this.props.page.loading) {
      return <div className='page home-page' />;
    } else {
      return (
        <div className='page home-page'>
          {
            this.props.page.heroImage && (
              <div className='row'>
                <img className='hero' title={this.props.page.heroImage.title} alt={this.props.page.heroImage.description} src={this.props.page.heroImage.url} />
              </div>
            )
          }
          <div className='row'>
            <div className='col-md-offset-1 col-md-5 no-min-height'>
              <FeatureToggle id='profile'>
              {
                this.props.page.profile
                  ? <Profile profile={this.props.page.profile} />
                  : null
              }
              </FeatureToggle>
            </div>
            <div className='col-md-5 no-min-height'>
              <FeatureToggle id='featuredSoftware'>
              {
                this.props.page.featuredSoftware
                  ? <FeaturedProjects projects={this.props.page.featuredSoftware} />
                  : null
              }
              </FeatureToggle>
            </div>
          </div>
          <FeatureToggle id='featuredArticles'>
          {
            this.props.page.featuredArticles
              ? <FeaturedArticles articles={this.props.page.featuredArticles} />
              : null
          }
          </FeatureToggle>
          <FeatureToggle id='featuredTalks'>
          {
            this.props.page.featuredTalks
              ? <FeaturedArticles articles={this.props.page.featuredTalks} />
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
