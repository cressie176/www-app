import React from 'react';
import { mount, } from 'enzyme';
import LinksSpotlight from './LinksSpotlight';

describe('LinksSpotlight', () => {

  it('should render spotlights', () => {
    const linksSpotlight = mount(
      <LinksSpotlight
        title='Social Networks'
        links={[
          { icon: 'fa-github' },
          { icon: 'fa-linkedin' }
        ]}
        type='social' />
    );

    expect(linksSpotlight.hasClass('links-spotlight')).toBe(true);
    expect(linksSpotlight.hasClass('links-spotlight--social')).toBe(true);

    expect(linksSpotlight.find('h2').text()).toBe('Social Networks');
    expect(linksSpotlight.find('ul li').length).toBe(2);
  });

});
