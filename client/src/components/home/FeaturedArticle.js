import React from 'react';
import PropTypes from 'prop-types';
import IconListItem from '../common/IconListItem';
import { connect, } from 'react-redux';
import { fetchArticle, } from '../../actions/articleActions';
import { Link, } from 'react-router-dom';


export class FeaturedArticle extends React.Component {
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
      );
    }
  }
}

FeaturedArticle.propTypes = {
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
    fetchArticle: (id) => {
      dispatch(fetchArticle(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedArticle);
