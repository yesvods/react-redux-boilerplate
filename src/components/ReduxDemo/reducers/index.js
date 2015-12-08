import {combineReducers} from 'redux';

const initState = {
  isDemo: true
}

function demo(state = initState, action) {
  return state;
}

export default combineReducers({
  demo
})