import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import fetchMock from 'fetch-mock';

describe('App', () => {

  afterEach(() => {
    fetchMock.restore();
  });

  it('should render without crashing', () => {

    fetchMock.get('*', {});

    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
});
