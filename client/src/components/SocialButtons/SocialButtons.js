import React from 'react';

import { LikeButton, } from '../Facebook';
import { ShareButton, FollowButton, } from '../Twitter';

const SocialButtons = ({ tweet, username, }) => (
  <div id='social-buttons'>
    <LikeButton />
    <span id="twitter">
      <ShareButton label='Tweet' text={tweet} />
      <FollowButton label='Follow' username={username} />
    </span>
  </div>
);

export default SocialButtons;
