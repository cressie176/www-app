import React from 'react';
import PropTypes from 'prop-types';
import { Link, } from 'react-router-dom';

import IconListItem from '../IconListItem';

class FeaturedArticle extends React.Component {

  componentDidMount() {
    this.props.fetchArticle(this.props.id);
  }

  render() {
    if (this.props.article.error) {
      return (
        <div className='col-md-4 featured-article--error' />
      );
    } else if (this.props.article.missing) {
      return (
        <div className='col-md-4 featured-article--not-found' />
      );
    } else if (this.props.article.loading) {
      return (
        <div className='col-md-4 featured-article--loading' />
      );
    } else if (!this.props.article.id) {
      return (
        <div className='col-md-4 featured-article' />
      );
    } else {
      return (
        <div className='col-md-4 featured-article'>
          <div className='featured-article__title__wrapper'>
            <h3 className='featured-article__title'><Link className='featured-article__title__link' to={this.props.article.url} dangerouslySetInnerHTML={{__html: this.props.article.title,}} /></h3>
          </div>
          <Link to={this.props.article.url}>
            <img className='featured-article__thumbnail' src={this.props.article.images.thumbnail.url} title={this.props.article.images.thumbnail.title} alt={this.props.article.images.thumbnail.description} />
          </Link>
          <div className='featured-article__summary' dangerouslySetInnerHTML={{__html: this.props.article.summary,}} />
          <ul className='featured-article__details'>
            {
              this.props.article.event ? (
                <IconListItem id='event' icon='fa-group' text={this.props.article.event.text} url={this.props.article.event.url} />
              ) : null
            }
            {
              this.props.article.date ? (
                <IconListItem id='date' icon='fa-calendar' text={this.props.article.date.toLocaleString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', })} />
              ) : null
            }
            {
              this.props.article.location ? (
                <IconListItem id='location' icon='fa-location-arrow' text={this.props.article.location} />
              ) : null
            }
          </ul>
        </div>
      );
    }
  }
}

FeaturedArticle.propTypes = {
  id: PropTypes.number,
  article: PropTypes.object,
};

export default FeaturedArticle;
