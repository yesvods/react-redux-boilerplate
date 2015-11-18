//third part lib
import Router, { Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import ReactDOM from 'react-dom';

//common style
import 'normalize.css';
import 'font-awesome/css/font-awesome.css';

//custom components
import Navigation from './Navigation';
import Demo from './components/demo';

/**
 * routes navgation information
 */
let history = createBrowserHistory();
let routes = (
  <Router history={history}>
    <Route path="/" component={Navigation} >
      <IndexRoute component={Demo}/>
      <Route path="demo" component={Demo}></Route>
    </Route>
  </Router>
)

ReactDOM.render(routes, document.getElementById('app'));
