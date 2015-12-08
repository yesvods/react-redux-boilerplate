import {Link} from 'react-router';
import style from './Navigation.scss';
export default
class extends React.Component {
  render(){
    return (
<div>
<ul className={style.navUl}>
  <li>
    <Link to="/demo" className="link">
      demo
    </Link>
  </li>
  <li>
    <Link to="/redux" className="link">
      redux
    </Link>
  </li>
</ul>
{this.props.children}
</div>
)
  }
}