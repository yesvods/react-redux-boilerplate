import Devtool from 'common/components/Devtool';

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

