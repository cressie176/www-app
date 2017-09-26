import React from 'react';
import PropTypes from 'prop-types';

import LinksSpotlight from '../LinksSpotlight';

class Spotlights extends React.Component {


  render() {

    const { spotlights = [], } = this.props;

    return (
      <div className='spotlights gutter'>
        <div className='row'>
          <div className='col-sm-offset-1 col-sm-10'>
            <div className='row'>
              {
                spotlights.map((spotlight, index) => {
                  return (
                    <div key={index} className='col-sm-4'>
                      <LinksSpotlight title={spotlight.title} id={spotlight.id} links={spotlight.links} />
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Spotlights.propTypes = {
  spotlights: PropTypes.array,
};

export default Spotlights;
