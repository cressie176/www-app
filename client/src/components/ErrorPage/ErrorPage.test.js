import React from 'react';
import { shallow, } from 'enzyme';
import ErrorPage from './ErrorPage';

describe('ErrorPage', () => {

  it('should render partial message', () => {
    const wrapper = shallow(
      <ErrorPage
        title='Oh Noes!'
        fullMessage='Oh Noes!'
        message='Oh '
        finishedTyping={false}
        typeKey={() => {}}
        finishTyping={() => {}}
      />
    );

    expect(wrapper.find('.message__text').text()).toBe('> Oh ');
    expect(wrapper.find('.message__cursor').exists()).toBe(false);
  });

  it('should render full message', () => {
    const wrapper = shallow(
      <ErrorPage
        title='Oh Noes!'
        fullMessage='Oh Noes!'
        message='Oh Noes!'
        finishedTyping={true}
        typeKey={() => {}}
        finishTyping={() => {}}
      />
    );

    expect(wrapper.find('.message__text').text()).toBe('> Oh Noes!');
    expect(wrapper.find('.message__cursor').text()).toBe('▋');
  });

  it('should type next letter', (done) => {
    expect.assertions(1);
    let expected = true;

    const onTypeKey = key => {
      clearTimeout(wrapper.instance().timeout);
      if (expected) expect(key).toBe('N');
      expected = false; // Jest suffers from test bleed
      done();
    };

    const wrapper = shallow(
      <ErrorPage
        title='Oh Noes!'
        fullMessage='Oh Noes!'
        message='Oh '
        finishedTyping={false}
        typeKey={onTypeKey}
        finishTyping={() => {}}
      />
    );
  });

  it('should finish typing', (done) => {

    expect.assertions(1);

    const onTypeKey = jest.fn();

    const onFinishTyping = () => {
      expect(onTypeKey.mock.calls.length).toBe(0);
      done();
    };

    shallow(
      <ErrorPage
        title='Oh Noes!'
        fullMessage='Oh Noes!'
        message='Oh Noes!'
        finishedTyping={false}
        typeKey={onTypeKey}
        finishTyping={onFinishTyping}
      />
    );
  });

});
