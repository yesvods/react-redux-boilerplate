import {createStore,applyMiddleware,compose} from 'redux';
//import all your middleware here
import thunk from 'redux-thunk';
export let defaultMiddlewares = [applyMiddleware(thunk)];

export function createStoreWithMiddleware(middlewares = []){
  return function(...args){
    return compose(
      ...middlewares,
      ...defaultMiddlewares,
    )(createStore)(...args);
  }
}