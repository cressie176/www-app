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
        <div className='legal-page'>
          <PageIntro icon='fa-spinner fa-spin' title='Loading…' />
        </div>
      );
    } else {
      return (
          <div className={`legal-page legal-page--${this.props.id}`}>

          <PageIntro title={this.props.page.title} />

          <div className='row'>
            <div className='col-sm-offset-1 col-sm-8'>
              <div className='body' dangerouslySetInnerHTML={{__html: this.props.page.body,}} />
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
