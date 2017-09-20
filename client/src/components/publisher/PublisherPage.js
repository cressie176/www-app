import React from 'react';
import PropTypes from 'prop-types';

import PageIntro from '../common/PageIntro';
import ExtractContentContainer from './ExtractContentContainer';
import TagPickerContainer from './TagPickerContainer';
import TagTableContainer from './TagTableContainer';

import './PublisherPage.css';

class PublisherPage extends React.Component {

  componentDidMount() {
    this.props.fetchReferences();
    this.props.fetchTags();
  }

  render() {
    return (
      <div className='page publisher-page'>

        <PageIntro title='Publisher' />

        <div className='row'>
          <div className='col-sm-offset-1 col-sm-6'>
             <ExtractContentContainer />
          </div>
        </div>

        <div className='row'>
          <div className='col-sm-offset-1 col-sm-6'>
             <TagPickerContainer selected={this.props.activeReference.tag} tags={this.props.tags} />
          </div>
        </div>

        <div className='row'>
          <div className='col-sm-offset-1 col-sm-6'>
             <TagTableContainer tags={this.props.tags} />
          </div>
        </div>
      </div>
    );
  }
}

PublisherPage.propTypes = {
  references: PropTypes.object,
  tags: PropTypes.array,
  activeReference: PropTypes.object,
};

export default PublisherPage;
