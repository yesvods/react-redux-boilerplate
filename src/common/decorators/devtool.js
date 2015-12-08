import Devtool from 'common/utils/Devtool';

export default Component => class extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <Component>
        { config.devtool && <Devtool /> }
      </Component>
    )
  }
}

