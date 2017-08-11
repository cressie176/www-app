import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import HomePage from './components/home/HomePage';
import LegalPage from './components/legal/LegalPage';
import ErrorPage from './components/error/ErrorPage';
import reducer from './reducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import content from './test-data';

import 'jquery/src/jquery';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const store = createStore(reducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='container-fluid' >
            <Header
              navigation={content.navigation}
            />
            <div className='container-fluid page'>
              <Switch>
                <Route path='/legal/terms-and-conditions' render={() =>
                  <LegalPage
                    title={content['terms-and-conditions'].title}
                    html={content['terms-and-conditions'].html}
                    type='terms-and-conditions'
                  />
                } />
                <Route path='/legal/privacy-policy' render={() =>
                  <LegalPage
                    title={content['privacy-policy'].title}
                    html={content['privacy-policy'].html}
                    type='privacy-policy'
                  />
                } />
                <Route exact path='/' render={() =>
                  <HomePage
                    page={content.pages.home}
                    profile={content.profile}
                    articles={content.articles}
                    projects={content.projects}
                    talks={content.talks}
                  />
                } />
                <Route path='/' render={() =>
                  <ErrorPage title='Error: Page Not Found' html='The page you have requested has not been found.' />
                } />
              </Switch>
            </div>
            <Footer
              spotlights={content.footer.spotlights}
              copyright={content.copyright}
            />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
