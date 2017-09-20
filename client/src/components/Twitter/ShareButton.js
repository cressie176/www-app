import React from 'react';
import PropTypes from 'prop-types';

const ShareButton = ({ text, label, }) => (
  <a className="twitter-share-button" href={`https://twitter.com/share?text=${text}`} data-show-count="false" data-size="large">${label}</a>
);

ShareButton.propTypes = {
  text: PropTypes.string,
  label: PropTypes.string,
};


export default ShareButton;
