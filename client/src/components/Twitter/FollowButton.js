import React from 'react';
import PropTypes from 'prop-types';

const FollowButton = ({ username, label, }) => (
  <a className='twitter-follow-button' href={`https://twitter.com/${username}`} data-show-count='false' data-size='large' data-show-screen-name='false'>${label}</a>
);

FollowButton.propTypes = {
  username: PropTypes.string,
  label: PropTypes.string,
};

export default FollowButton;
