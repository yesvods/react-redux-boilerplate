import Router, { Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import Navigation from './Navigation';
import Example from 'components/Example';

/**
 * routes navgation information
 */
let routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={Navigation}>
      <IndexRoute component={Example}/>
    </Route>
  </Router>
)

ReactDOM.render(routes, document.getElementById('body'));