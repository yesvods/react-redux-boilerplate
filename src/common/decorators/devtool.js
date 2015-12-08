import Devtool from 'common/utils/Devtool';

export default (Component, store) => class extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <Component>
        { config.devtool && <Devtool store={store} /> }
      </Component>
    )
  }
}

