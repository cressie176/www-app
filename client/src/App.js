// React / Redux
import React, { Component, } from 'react';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware, } from 'redux';
import thunk from 'redux-thunk';
import { Provider, } from 'react-redux';
import { composeWithDevTools, } from 'redux-devtools-extension';

// Components
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import HomePage from './components/home/HomePage';
import ArticleListPage from './components/articles/ArticleListPage';
import LegalPage from './components/legal/LegalPage';
import ErrorPage from './components/error/ErrorPage';
import FeatureToggleQueryParser from './components/common/FeatureToggleQueryParser';
import ScrollToTop from './components/common/ScrollToTop';

// Actions
import { removeAllObfuscation, } from './actions/obfuscationActions';

// Reducers
import software from './reducers/softwareReducer';
import obfuscation from './reducers/obfuscationReducer';
import featureToggles from './reducers/featureTogglesReducer';

// Miscellaneous
import content from './content';
import 'autotrack/autotrack.js';

// CSS
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Must be imported after bootstrap css

/***************************************************************
Using require and assigning jQuery to window to workaround the
following errors on npm start and npm test:

  1) 'Bootstrap's JavaScript requires jQuery' error
  2) Uncaught ReferenceError: define is not defined

***************************************************************/
window.jQuery = window.$ = require('jquery');
require('bootstrap/dist/js/bootstrap.min.js');

const config = Object.assign({ featureToggles: {}, }, window.config);

const store = createStore(combineReducers({
  software,
  obfuscation,
  featureToggles,
}), config, composeWithDevTools(
  applyMiddleware(thunk)
));


class App extends Component {
  removeAllObfuscation() {
    store.dispatch(removeAllObfuscation());
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <ScrollToTop>
            <FeatureToggleQueryParser />
            <div className='container-fluid' onTouchStart={() => this.removeAllObfuscation()}>
              <Header
                navigation={content.navigation}
              />
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
                <Route exact path='/blog' render={() =>
                  <ArticleListPage
                    page={content.pages.blog}
                  />
                } />
                <Route path='/' render={() =>
                  <ErrorPage title='Page Not Found' html='The page you have requested has not been found.' />
                } />
              </Switch>
              <Footer
                spotlights={content.footer.spotlights}
                copyright={content.copyright}
              />
            </div>
          </ScrollToTop>
        </Router>
      </Provider>
    );
  }
}

export default App;
