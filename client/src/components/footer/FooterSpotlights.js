import React from 'react';
import PropTypes from 'prop-types';
import LinksSpotlightContainer from '../common/LinksSpotlightContainer';

import './FooterSpotlights.css';

class FooterSpotlights extends React.Component {
  render() {
    return (
      <div className='footer__spotlights gutter'>
        <div className='row'>
          <div className='col-sm-offset-1 col-sm-10'>
            <div className='row'>
              {
                this.props.spotlights && this.props.spotlights.map((spotlight, index) => {
                  return (
                    <div key={index} className='col-sm-4'>
                      <LinksSpotlightContainer title={spotlight.title} id={spotlight.id} links={spotlight.links} />
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

FooterSpotlights.propTypes = {
  spotlights: PropTypes.array,
};

export default FooterSpotlights;
