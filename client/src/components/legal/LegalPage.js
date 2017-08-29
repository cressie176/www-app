import React from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'react-redux';
import { fetchPage, } from '../../actions/pageActions';

import PageIntro from '../common/PageIntro';

import './LegalPage.css';

export class LegalPage extends React.Component {

  componentWillMount() {
    this.props.fetchPage(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.props.fetchPage(nextProps.id);
    }
  }

  render() {
    return (
        <div className={`page legal-page legal-page--{this.props.id}`}>

        <PageIntro title={this.props.page.title} />

        <div className='row'>
          <div className='col-sm-offset-1 col-sm-8'>
            <div className='blurb' dangerouslySetInnerHTML={{__html: this.props.page.html,}} />
          </div>
        </div>
      </div>
    );
  }
}

LegalPage.propTypes = {
  id: PropTypes.string,
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
      dispatch(fetchPage(id, { relative: true, }));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LegalPage);
