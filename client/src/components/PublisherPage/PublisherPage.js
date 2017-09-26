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

    const { tags, activeReference, error,} = this.props;

    return (
      <div className='page publisher-page'>

        <PageIntro title='Publisher' />
        {
          (() => {
            if (error) {
              return (
                <div className='row'>
                  <div className='col-sm-offset-1 col-sm-10'>
                    <div className='alert alert-danger'>
                      <i className={`fa fa-exclamation-triangle icon-text`} aria-hidden='true'></i>
                      {error.message}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div>
                <div className='row'>
                  <div className='col-sm-offset-1 col-sm-6'>
                     <TagExtract />
                  </div>
                </div>

                <div className='row'>
                  <div className='col-sm-offset-1 col-sm-6'>
                     <TagPicker selected={activeReference.tag} tags={tags} />
                  </div>
                </div>

                <div className='row'>
                  <div className='col-sm-offset-1 col-sm-6'>
                     <TagTable tags={tags} />
                  </div>
                </div>
              </div>
            );
          })()
        }
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
