import React from 'react';
import { mount, } from 'enzyme';
import LinksSpotlight from './LinksSpotlight';

describe('LinksSpotlight', () => {

  it('should render spotlights', () => {
    const wrapper = mount(
      <LinksSpotlight
        title='Social Networks'
        links={[
          { icon: 'fa-github', },
          { icon: 'fa-linkedin', },
        ]}
        type='social' />
    );

    expect(wrapper.hasClass('links-spotlight')).toBe(true);
    expect(wrapper.hasClass('links-spotlight--social')).toBe(true);

    expect(wrapper.find('h2').text()).toBe('Social Networks');
    expect(wrapper.find('ul li').length).toBe(2);
  });

});
