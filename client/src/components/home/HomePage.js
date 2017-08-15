import React from 'react';
import PropTypes from 'prop-types';
import './HomePage.css';
import Profile from './Profile';
import FeaturedArticles from './FeaturedArticles';
import FeaturedProjects from './FeaturedProjects';
import HeroImg from './hero.jpg';

const HomePage = ({ page, profile, articles, projects, talks, }) => (
  <div className='HomePage'>
    <div className='container-fluid'>
      <div className='row'>
        <img className='hero' alt='hero' src={HeroImg} />
      </div>
    </div>
    <div className='container'>
      <div className='row'>
        <div className='col-md-6'>
          <Profile
            title={profile.title}
            summary={profile.summary}
          />
        </div>
        <div className='col-md-6'>
          <FeaturedProjects
            title={page.featuredProjects.title}
            icon={page.featuredProjects.icon}
            projects={page.featuredProjects.items.map(id => projects[id])}
            link={page.featuredProjects.link}
          />
        </div>
      </div>
    </div>
    {/* Disabled for MVP
    <FeaturedArticles
      title={page.featuredArticles.title}
      icon={page.featuredArticles.icon}
      articles={page.featuredArticles.items.map(id => articles[id])}
      link={page.featuredArticles.link}
    />
    */}
    <FeaturedArticles
      title={page.featuredTalks.title}
      icon={page.featuredTalks.icon}
      articles={page.featuredTalks.items.map(id => talks[id])}
      link={page.featuredTalks.link}
    />
  </div>
);

HomePage.propTypes = {
  page: PropTypes.object,
  profile: PropTypes.object,
  articles: PropTypes.object,
  projects: PropTypes.object,
};

export default HomePage;
