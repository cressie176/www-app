// React / Redux
import React from 'react';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware, } from 'redux';
import thunk from 'redux-thunk';
import { Provider, } from 'react-redux';
import { composeWithDevTools, } from 'redux-devtools-extension';

// Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './components/HomePage';
import ArticleListPage from './components/ArticleListPage';
import ArticlePage from './components/ArticlePage';
import LegalPage from './components/LegalPage';
import PublisherPage from './components/PublisherPage';
import ErrorPage from './components/ErrorPage';
import FeatureToggleQueryParser from './components/FeatureToggle/FeatureToggleQueryParser';
import ScrollToTop from './components/ScrollToTop';

// Actions
import { removeAllObfuscation, } from './actions/obfuscationActions';
import { fetchSite, } from './actions/siteActions';

// Reducers
import config from './reducers/configReducer';
import content from './reducers/contentReducer';
import obfuscation from './reducers/obfuscationReducer';
import error from './reducers/errorReducer';
import site from './reducers/siteReducer';
import page from './reducers/page';
import article from './reducers/article';
import articleList from './reducers/articleList';
import projects from './reducers/projects';

// Miscellaneous
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
  content,
  obfuscation,
  error,
  site,
  page,
  article,
  articleList,
  projects,
}), initialState, composeWithDevTools(
  applyMiddleware(thunk)
));


class App extends React.Component {
  componentWillMount() {
    store.dispatch(fetchSite());
  }
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
              <Header />
              <Switch>
                <Route exact path='/' render={() =>
                  <HomePage />
                } />
                <Route exact path='/legal/:pageId(terms-and-conditions|privacy-policy|production-credits)' render={({ match, }) =>
                  <LegalPage id={match.params.pageId} />
                } />
                <Route exact path='/:channel(blog|talks)' render={({ match, }) =>
                  <ArticleListPage id={match.params.channel} />
                } />
                <Route exact path='/:channel(blog|talks)/:slug' render={
                  ({ match, }) => {
                    const id = parseInt(match.params.slug.split('-').slice(-1)[0], 10);
                    return isNaN(id)
                      ? <ErrorPage title='Page Not Found' html='The page you have requested has not been found.' />
                      : <ArticlePage id={id} />;
                  }
                } />
                <Route exact path='/publisher/' render={({ match, }) =>
                  <PublisherPage />
                } />
                <Route path='/' render={() =>
                  <ErrorPage title='Page Not Found' html='The page you have requested has not been found.' />
                } />
              </Switch>
              <Footer />
            </div>
          </ScrollToTop>
        </Router>
      </Provider>
    );
  }
}

export default App;
