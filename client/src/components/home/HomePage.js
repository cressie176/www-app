import React from 'react';
import PropTypes from 'prop-types';
import './HomePage.css';
import Profile from './Profile';
import FeaturedArticles from './FeaturedArticles';
import FeaturedProjects from './FeaturedProjects';
import HeroImg from './hero.jpg';
import FeatureToggle from '../common/FeatureToggle';

const HomePage = ({ page, profile, articles, projects, talks, }) => (
  <div className='HomePage'>
    <div className='row'>
      <img className='hero' alt='hero' src={HeroImg} />
    </div>
    <div className='row'>
      <div className='col-md-offset-1 col-md-5'>
        <FeatureToggle id='profile'>
          <Profile
            title={profile.title}
            summary={profile.summary}
          />
        </FeatureToggle>
      </div>
      <div className='col-md-5'>
        <FeatureToggle id='featuredProjects'>
          <FeaturedProjects
            title={page.featuredProjects.title}
            icon={page.featuredProjects.icon}
            projects={page.featuredProjects.items.map(id => projects[id])}
            link={page.featuredProjects.link}
          />
        </FeatureToggle>
      </div>
    </div>
    <FeatureToggle id='featuredArticles'>
      <FeaturedArticles
        title={page.featuredArticles.title}
        icon={page.featuredArticles.icon}
        articles={page.featuredArticles.items.map(id => articles[id])}
        link={page.featuredArticles.link}
      />
    </FeatureToggle>
    <FeatureToggle id='featuredTalks'>
      <FeaturedArticles
        title={page.featuredTalks.title}
        icon={page.featuredTalks.icon}
        articles={page.featuredTalks.items.map(id => talks[id])}
        link={page.featuredTalks.link}
      />
    </FeatureToggle>
  </div>
);

HomePage.propTypes = {
  page: PropTypes.object,
  profile: PropTypes.object,
  articles: PropTypes.object,
  projects: PropTypes.object,
};

export default HomePage;
