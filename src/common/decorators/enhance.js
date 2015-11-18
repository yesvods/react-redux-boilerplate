/**
 * 为组件添加toggle能力，对外开发toggle方法
 * @param {React.PropTypes.Element} ComposedComponent 被封装组件
 */
export function toggleEnhance(ComposedComponent){
  return class Enhance extends React.Component {
    /**
     * handleToggle，对外提供toggle时钩子函数
     */
    static propTypes = {
      handleToggle: React.PropTypes.func,
    }
    static defaultProps = {
      handleToggle: function(){},
    }
    constructor(){
      super();
      this.state = {}
    }
    toggle(flag){
      flag = _.isBoolean(flag)?flag:!this.state._componentShow;
      this.setState({
        _componentShow: flag, 
      });
      this.props.handleToggle(flag);
    }
    componentDidUpdate(prevProps, prevState) {
      let dom = ReactDOM.findDOMNode(this.refs.composedComponent);
      dom.style.display = this.state._componentShow?'inline-block':'none';
    }
    render(){
      return <ComposedComponent ref="composedComponent" />
    }
  }
}
/**
 * 1、为组件添加toggle能力，对外开发toggle方法
 * 2、为组件添加blur事件，触发blur后，此封装组件会被自动隐藏
 * 外部组件使用toggle方法时，需要判断全局是否处于bluring
 * 若bluring===true,则不能调用此toggle方法
 * onClick={()=>{
 *  if(!global.bluring){
 *    xx.toggle();
 *  }
 * }}
 * @param {React.PropTypes.Element} ComposedComponent 被封装组件
 */
export function toggleBlurEnhance(ComposedComponent){
  return class Enhance extends React.Component {
    constructor(){
      super();
      this.state = {}
    }
    /**
     * handleToggle，对外提供toggle时钩子函数
     */
    static propTypes = {
      handleToggle: React.PropTypes.func,
    }
    static defaultProps = {
      handleToggle: function(){},
    }
    getShowFlag(){
      console.log(!!this.state._componentShow)
      return !!this.state._componentShow;
    }
    toggle(flag){
      flag = _.isBoolean(flag)?flag:!this.state._componentShow;
      this.setState({
        _componentShow: flag, 
      });
      this.props.handleToggle(flag);
    }
    componentDidMount() {
      let dom = ReactDOM.findDOMNode(this.refs.composedComponent);
      dom.addEventListener('blur', () => {
        this.toggle(false);
        global.bluring = true;
        setTimeout(() => {global.bluring = false;}, 200);
      })
      dom.setAttribute('tabindex', '0');
    }
    componentDidUpdate(prevProps, prevState) {
      let dom = ReactDOM.findDOMNode(this.refs.composedComponent);
      dom.style.display = this.state._componentShow?'inline-block':'none';
      if(true===this.state._componentShow){
        dom.focus();
      }
    }
    render(){
      return <ComposedComponent ref="composedComponent"/>
    }
  }
}

// export let toggleBlurEnhance = ComposedComponent => class extends React.Component {
//   constructor() {
//     super();
//     this.state = {};
//   }
//   toggle(flag){
//     flag = _.isUndefined(flag)?!this.state._componentShow:flag;
//     this.setState({
//       _componentShow: flag, 
//     });
//   }
  // componentDidUpdate(prevProps, prevState) {
  //   let dom = ReactDOM.findDOMNode(this.refs.composedComponent);
  //   dom.style.display = this.state._componentShow?'inline-block':'none';
  // }
//   render(){
//     return <ComposedComponent ref="composedComponent"/>
//   }
// };