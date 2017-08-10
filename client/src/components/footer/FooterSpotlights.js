import React from 'react';
import PropTypes from 'prop-types';
import LinksSpotlight from '../common/LinksSpotlight';

const FooterSpotlights = ({spotlights}) => (
  <div className='container'>
    <div className='row'>
      {
        spotlights.map((spotlight, index) => {
          return (
            <div key={index} className='col-md-4'>
              <LinksSpotlight title={spotlight.title} type={spotlight.type} links={spotlight.links} />
            </div>
          )
        })
      }
    </div>
  </div>
)

FooterSpotlights.propTypes = {
  spotlights: PropTypes.array,
};

export default FooterSpotlights;

