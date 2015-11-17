import Router, { Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import Navigation from './Navigation';
import ReactDOM from 'react-dom';
import Demo from './components/demo';

/**
 * routes navgation information
 */
let history = createBrowserHistory();
let routes = (
  <Router history={history}>
    <Route path="/" component={Navigation} >
      <IndexRoute component={Demo}/>
    </Route>
  </Router>
)

ReactDOM.render(routes, document.getElementById('app'));