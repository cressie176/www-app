import React from 'react';
import { mount, } from 'enzyme';
import { FeatureToggleQueryParser, } from './FeatureToggleQueryParser';

describe('FeatureToggleQueryParser', () => {

  it('should tolerate no query params', () => {
    const location = {
      search: '',
    };
    const fail = () => {
      throw new Error('Should not have been called');
    };
    mount(
      <FeatureToggleQueryParser location={location} toggleFeatures={fail} />
    );
  });

  it('should tolerate no feature query params', () => {
    const location = {
      search: '?foo=bar',
    };
    const fail = () => {
      throw new Error('Should not have been called');
    };
    mount(
      <FeatureToggleQueryParser location={location} toggleFeatures={fail} />
    );
  });

  it('should enable a single feature', () => {
    expect.assertions(1);
    const location = {
      search: '?feature=foo',
    };
    const toggleFeatures = (features) => {
      expect(features.foo).toBe(true);
    };
    mount(
      <FeatureToggleQueryParser location={location} toggleFeatures={toggleFeatures} />
    );
  });

  it('should enable a single feature with explicit on', () => {
    expect.assertions(1);
    const location = {
      search: '?feature=foo=on',
    };
    const toggleFeatures = (features) => {
      expect(features.foo).toBe(true);
    };
    mount(
      <FeatureToggleQueryParser location={location} toggleFeatures={toggleFeatures} />
    );
  });

  it('should enable multiple features', () => {
    expect.assertions(2);
    const location = {
      search: '?feature=foo&feature=bar',
    };
    const toggleFeatures = (features) => {
      expect(features.foo).toBe(true);
      expect(features.bar).toBe(true);
    };
    mount(
      <FeatureToggleQueryParser location={location} toggleFeatures={toggleFeatures} />
    );
  });

  it('should disable a single feature with explicit off', () => {
    expect.assertions(1);
    const location = {
      search: '?feature=foo=off',
    };
    const toggleFeatures = (features) => {
      expect(features.foo).toBe(false);
    };
    mount(
      <FeatureToggleQueryParser location={location} toggleFeatures={toggleFeatures} />
    );
  });

  it('should mix and match multiple features', () => {
    expect.assertions(3);
    const location = {
      search: '?feature=foo=on&feature=bar=off&feature=baz',
    };
    const toggleFeatures = (features) => {
      expect(features.foo).toBe(true);
      expect(features.bar).toBe(false);
      expect(features.baz).toBe(true);
    };
    mount(
      <FeatureToggleQueryParser location={location} toggleFeatures={toggleFeatures} />
    );
  });

});
