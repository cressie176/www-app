import React from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'react-redux';
import { fetchTags, fetchReferences, } from '../../actions/contentActions';

import PageIntro from '../common/PageIntro';
import ExtractContentContainer from './ExtractContentContainer';
import TagPicker from './TagPicker';
import TagTable from './TagTable';
import naturally from 'string-natural-compare';


import './PublisherPage.css';

export class PublisherPage extends React.Component {

  componentWillMount() {
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

function mapStateToProps(state, props) {
  const references = state.content.references;

  const tags = state.content.tags.map(id => {
    return { id, referencedBy: [], };
  }).map(tag => {
    Object.keys(references).forEach(id => {
      if (references[id].tag === tag.id) tag.referencedBy.push(id);
    });
    return tag;
  }).sort((a, b) => {
    return naturally(b.id, a.id);
  });

  const activeReference = Object.keys(references).map(id => references[id]).find(reference => reference.active) || {};

  return {
    references,
    tags,
    activeReference: activeReference,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchReferences: () => {
      dispatch(fetchReferences());
    },
    fetchTags: () => {
      dispatch(fetchTags());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PublisherPage);
