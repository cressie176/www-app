import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import nock from 'nock';


describe('App', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  it('should render without crashing', () => {

    nock('https://api.npmjs.org')
      .get(/.*/)
      .times(100)
      .reply(200, { downloads: 1000, });

    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
});
