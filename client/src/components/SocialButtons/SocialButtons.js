import React from 'react';

import { LikeButton, } from '../Facebook';
import { ShareButton, FollowButton, } from '../Twitter';

const SocialButtons = ({ tweet, username, }) => (
  <div className='row'>
    <div className='col-sm-offset-1 col-sm-10'>
      <div id='social-buttons'>
        <LikeButton />
        <span id="twitter">
          <ShareButton label='Tweet' text={tweet} />
          <FollowButton label='Follow' username={username} />
        </span>
      </div>
    </div>
  </div>
);

export default SocialButtons;
