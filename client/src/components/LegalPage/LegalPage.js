import React from 'react';
import PropTypes from 'prop-types';

import PageIntro from '../PageIntro';
import ErrorPage from '../ErrorPage';

import './LegalPage.css';

class LegalPage extends React.Component {

  componentDidMount() {
    this.props.fetchPage(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.props.fetchPage(nextProps.id);
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.page && (nextProps.page.title || nextProps.error) ? true : false;
  }

  render() {

    const { page, loading, missing, error, } = this.props;

    if (error) {
      return (
        <ErrorPage title='Error loading page' />
      );
    } else if (missing) {
      return (
        <ErrorPage title='Page Not Found' />
      );
    } else if (loading || !page.title) {
      return (
        <div className='page legal-page' />
      );
    } else {
      return (
        <div className={`page legal-page legal-page--${this.props.id}`}>

          <PageIntro title={this.props.page.title} />

          <div className='row'>
            <div className='col-md-offset-2 col-md-8'>
              <div className={`legal-page__article`}>
                <div className='legal-page__article__body' dangerouslySetInnerHTML={{__html: this.props.page.body,}} />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

LegalPage.propTypes = {
  id: PropTypes.string,
  page: PropTypes.object,
  loading: PropTypes.bool,
  missing: PropTypes.bool,
  error: PropTypes.object,
};

export default LegalPage;
