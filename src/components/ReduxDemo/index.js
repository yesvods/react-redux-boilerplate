import { Component } from 'react';
import {Provider} from 'react-redux';
import devtool from 'common/decorators/devtool';  // add devtool
import {createStoreWithMiddleware} from 'common/utils/store';
import rootReducers from './reducers';

const store = createStoreWithMiddleware()(rootReducers) 

@devtool      // add devtool
export default
class ReduxDemo extends Component {
  render(){
    return (
<Provider store={store}>
  <div>
    <div>this is redux demo ,you can disable redux devtool in config.js</div>
    {this.props.children}
  </div>
</Provider>
)
  }
}