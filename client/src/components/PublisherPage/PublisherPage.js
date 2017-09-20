import React from 'react';
import PropTypes from 'prop-types';

import PageIntro from '../PageIntro';
import TagExtract from '../TagExtract';
import TagPicker from '../TagPicker';
import TagTable from '../TagTable';

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
             <TagExtract />
          </div>
        </div>

        <div className='row'>
          <div className='col-sm-offset-1 col-sm-6'>
             <TagPicker selected={this.props.activeReference.tag} tags={this.props.tags} />
          </div>
        </div>

        <div className='row'>
          <div className='col-sm-offset-1 col-sm-6'>
             <TagTable tags={this.props.tags} />
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
