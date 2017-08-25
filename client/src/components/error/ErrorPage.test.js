import React from 'react';
import { shallow, } from 'enzyme';
import { ErrorPage, } from './ErrorPage';

describe('ErrorPage', () => {

  it('should render partial message', () => {
    const wrapper = shallow(
      <ErrorPage
        title='Oh Noes!'
        type='not-found'
        fullMessage='Oh Noes!'
        message='Oh '
        finishedTyping={false}
        typeKey={() => {}}
      />
    );

    expect(wrapper.find('.message__text').text()).toBe('> Oh ');
    expect(wrapper.find('.message__cursor').exists()).toBe(false);
  });

  it('should render full message', () => {
    const wrapper = shallow(
      <ErrorPage
        title='Oh Noes!'
        type='not-found'
        fullMessage='Oh Noes!'
        message='Oh Noes!'
        finishedTyping={true}
        typeKey={() => {}}
      />
    );

    expect(wrapper.find('.message__text').text()).toBe('> Oh Noes!');
    expect(wrapper.find('.message__cursor').text()).toBe('▋');
  });

  it('should type next letter', (done) => {
    expect.assertions(1);

    const onTypeKey = key => {
      expect(key).toBe('N');
      done();
    };

    shallow(
      <ErrorPage
        title='Oh Noes!'
        type='not-found'
        fullMessage='Oh Noes!'
        message='Oh '
        finishedTyping={false}
        typeKey={onTypeKey}
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
        type='not-found'
        fullMessage='Oh Noes!'
        message='Oh Noes!'
        finishedTyping={false}
        typeKey={onTypeKey}
        finishTyping={onFinishTyping}
      />
    );
  });

});
