import { Component } from 'react';
import {Provider} from 'react-redux';
import devtool from 'common/decorators/devtool';
import {createStoreWithMiddleware} from 'common/utils/store';
import rootReducers from './reducers';

const store = createStoreWithMiddleware()(rootReducers) 

@devtool
export default
class ReduxDemo extends Component {
  render(){
    return (
<Provider store={store}>
  <div>
    <div>haha</div>
    {this.props.children}
  </div>
</Provider>
)
  }
}