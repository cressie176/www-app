import React from 'react';
import PropTypes from 'prop-types';
import LinksSpotlight from '../common/LinksSpotlight';

const FooterSpotlights = ({spotlights,}) => (
  <div className='footer__spotlights gutter'>
    <div className='row'>
      <div className='col-sm-offset-1 col-sm-10'>
        <div className='row'>
          {
            spotlights.map((spotlight, index) => {
              return (
                <div key={index} className='col-sm-4'>
                  <LinksSpotlight title={spotlight.title} type={spotlight.type} links={spotlight.links} />
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  </div>
);

FooterSpotlights.propTypes = {
  spotlights: PropTypes.array,
};

export default FooterSpotlights;

