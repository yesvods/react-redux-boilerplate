import {Link} from 'react-router';
import style from './Navigation.scss';
export default
class extends React.Component {
  render(){
    return (
<div>
<ul className={style.navUl}>
  <Link to="/demo">
    <li>1</li>
  </Link>
</ul>
{this.props.children}
</div>
)
  }
}