import React from 'react';
import { shallow, } from 'enzyme';
import LegalPage from './LegalPage';

describe('Legal Page', () => {

  it('should render message on error', () => {
    const wrapper = shallow(
      <LegalPage
        id='blog'
        error={new Error('Oh Noes!')}
        page={{}}
      />
    );

    expect(wrapper.is('Connect(ErrorPage)')).toBe(true);
    expect(wrapper.prop('title')).toBe('Error loading page');
  });

  it('should render message on not found', () => {
    const wrapper = shallow(
      <LegalPage
        id='blog'
        missing={true}
        page={{}}
      />
    );

    expect(wrapper.is('Connect(ErrorPage)')).toBe(true);
    expect(wrapper.prop('title')).toBe('Page Not Found');
  });

  it('should advise when page is loading', () => {
    const wrapper = shallow(
      <LegalPage
        id='blog'
        loading={true}
        page={{}}
      />
    );
    expect(wrapper.find('PageIntro').prop('title')).toBe('Loading…');
  });

});
