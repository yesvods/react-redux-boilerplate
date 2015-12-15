import {createStore,applyMiddleware,compose} from 'redux';
//import all your middleware here
import thunk from 'redux-thunk';
import Devtools from '../components/Devtool';
import { persistState } from 'redux-devtools';

export let defaultMiddlewares = [applyMiddleware(thunk)];

if (config.devtool) {
  defaultMiddlewares = defaultMiddlewares.concat([
    Devtools.instrument(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  ]);
}

export function createStoreWithMiddleware(middlewares = []){
  return function(...args){
    return compose(
      ...middlewares,
      ...defaultMiddlewares,
    )(createStore)(...args);
  }
}