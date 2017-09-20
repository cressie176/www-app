import React from 'react';
import PropTypes from 'prop-types';

export const FollowButton = ({ username, label, }) => (
  <a className='twitter-follow-button' href={`https://twitter.com/${username}`} data-show-count='false' data-size='large' data-show-screen-name='false'>{label}</a>
);

FollowButton.propTypes = {
  username: PropTypes.string,
  label: PropTypes.string,
};


export const ShareButton = ({ text, label, }) => (
  <a className="twitter-share-button" href={`https://twitter.com/share?text=${text}`} data-show-count="false" data-size="large">{label}</a>
);

ShareButton.propTypes = {
  text: PropTypes.string,
  label: PropTypes.string,
};

