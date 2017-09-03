import React from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'react-redux';
import { fetchTags, } from '../../actions/contentActions';

import PageIntro from '../common/PageIntro';
import ExtractContent from './ExtractContent';
import TagPicker from './TagPicker';
import TagTable from './TagTable';


import './PublisherPage.css';

export class PublisherPage extends React.Component {

  componentWillMount() {
    this.props.fetchTags();
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.id !== this.props.id) {
    //   this.props.fetchPage(nextProps.id);
    // }
  }

  shouldComponentUpdate(nextProps) {
    return true;
  }

  render() {
    return (
      <div className={`page publisher-page`}>

        <PageIntro title='Publisher' />

        <div className='row'>
          <div className='col-sm-offset-1 col-sm-6'>
             <ExtractContent />
          </div>
        </div>

        <div className='row'>
          <div className='col-sm-offset-1 col-sm-6'>
             <TagPicker selected={this.props.selected} tags={this.props.tags} />
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
  references: PropTypes.array,
  tags: PropTypes.array,
  currentTag: PropTypes.string,
};

function mapStateToProps(state, props) {
  const references = {"local":{"id":"1","date":"2017-09-02T23:42:38.526Z",},"stage":{"id":"1","date":"2017-09-02T23:03:26.195Z",},"test":{"id":"1","date":"2017-09-02T23:03:26.195Z",},};
  const tags = state.content.tags.map(id => {
    return { id, referencedBy: [], };
  }).map(tag => {
    Object.keys(references).forEach(reference => {
      if (references[reference].id === tag.id) tag.referencedBy.push(reference);
    });
    return tag;
  }).sort((a, b) => {
    return a.id.localeCompare(b.id);
  });

  return {
    references,
    tags,
    selected: "2",
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTags: () => {
      dispatch(fetchTags());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PublisherPage);
