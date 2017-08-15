import React from 'react';
import { mount, } from 'enzyme';
import { LinksSpotlight, } from './LinksSpotlight';

describe('LinksSpotlight', () => {

  it('should render spotlights without obfuscation', () => {
    const wrapper = mount(
      <LinksSpotlight
        title='Contacts'
        links={[
          { icon: 'fa-email', text: 'foo@bar.com', url: 'mailto://foo@bar.com', },
          { icon: 'fa-phone', text: '+44 (0) 123 456', url: 'tel:+4412345x', },
        ]}
        type='contact'
        obfuscate={ false } />
    );

    expect(wrapper.hasClass('links-spotlight')).toBe(true);
    expect(wrapper.hasClass('links-spotlight--contact')).toBe(true);
    expect(wrapper.find('.links-spotlight__list').hasClass('links-spotlight__list--clear')).toBe(true);

    expect(wrapper.find('.links-spotlight__title').text()).toBe('Contacts');
    expect(wrapper.find('.links-spotlight__list .icon-list__item').length).toBe(2);
    expect(wrapper.find('.links-spotlight__list .icon-list__item__link').first().prop('href')).toBe('mailto://foo@bar.com');
    expect(wrapper.find('.links-spotlight__list .icon-list__item__link').first().text()).toBe('foo@bar.com');
  });

  it('should render spotlights with obfuscation', () => {
    const wrapper = mount(
      <LinksSpotlight
        title='Contacts'
        links={[
          { icon: 'fa-email', text: 'foo@bar.com', url: 'mailto://foo@bar.com', },
          { icon: 'fa-phone', text: '+44 (0) 123 456', url: 'tel:+44123456', },
        ]}
        type='contact'
        obfuscate={ true } />
    );

    expect(wrapper.hasClass('links-spotlight')).toBe(true);
    expect(wrapper.hasClass('links-spotlight--contact')).toBe(true);
    expect(wrapper.find('.links-spotlight__list').hasClass('links-spotlight__list--obfuscated')).toBe(true);

    expect(wrapper.find('.links-spotlight__title').text()).toBe('Contacts');
    expect(wrapper.find('.links-spotlight__list .icon-list__item').length).toBe(2);
    expect(wrapper.find('.links-spotlight__list .icon-list__item__text').first().text()).toBe('xxx@xxx.xxx');
  });

});
