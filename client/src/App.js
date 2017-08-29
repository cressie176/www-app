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
import ArticlePage from './components/articles/ArticlePage';
import LegalPage from './components/legal/LegalPage';
import ErrorPage from './components/error/ErrorPage';
import FeatureToggleQueryParser from './components/common/FeatureToggleQueryParser';
import ScrollToTop from './components/common/ScrollToTop';

// Actions
import { removeAllObfuscation, } from './actions/obfuscationActions';

// Reducers
import config from './reducers/configReducer';
import obfuscation from './reducers/obfuscationReducer';
import error from './reducers/errorReducer';
import page from './reducers/pageReducer';
import articles from './reducers/articlesReducer';
import projects from './reducers/projectsReducer';

// Miscellaneous
import data from './content';
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

const initialState = Object.assign({}, { config: window.config, });

const store = createStore(combineReducers({
  config,
  obfuscation,
  error,
  page,
  articles,
  projects,
}), initialState, composeWithDevTools(
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
                navigation={data.navigation}
              />
              <Switch>
                <Route exact path='/' render={() =>
                  <HomePage />
                } />
                <Route exact path='/legal/:pageId(terms-and-conditions|privacy-policy)' render={({ match, }) =>
                  <LegalPage id={match.params.pageId} />
                } />
                <Route exact path='/:channel(blog|talks)' render={({ match, }) =>
                  <ArticleListPage
                    id={match.params.channel}
                  />
                } />
                <Route exact path='/:channel(blog|talks)/:slug' render={({ match, }) =>
                  <ArticlePage
                    id={parseInt(match.params.slug.split('-').slice(-1)[0], 10)}
                  />
                } />

                <Route path='/' render={() =>
                  <ErrorPage title='Page Not Found' html='The page you have requested has not been found.' />
                } />
              </Switch>
              <Footer
                spotlights={data.footer.spotlights}
                copyright={data.copyright}
              />
            </div>
          </ScrollToTop>
        </Router>
      </Provider>
    );
  }
}

export default App;
