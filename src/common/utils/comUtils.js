import Tether from 'tether';
import _ from 'lodash';
import uuid from 'node-uuid';

class PopCom extends React.Component {
  constructor(){
    super();
    this.state = {};
  }
  componentDidMount() {
    let { attachment, justify, target, blur, onBlur, autoClose } =  this.props.config;
    let comDOM = ReactDOM.findDOMNode(this.refs.body);
    let tetherConfig = {
      element: comDOM,
      target,
      constraints: [{
        to: 'window',
        attachment: justify?'together':'none',
      }]
    };
    let attachmentConfig = {};
    switch(attachment){
    case 'tl':
      attachmentConfig = {
        attachment: 'bottom left',
        targetAttachment: 'top left',
      }  
      break;
    case 'tr':
      attachmentConfig = {
        attachment: 'bottom right',
        targetAttachment: 'top right',
      }  
      break;
    case 'rt':
      attachmentConfig = {
        attachment: 'top left',
        targetAttachment: 'top right',
      }  
      break;
    case 'rb':
      attachmentConfig = {
        attachment: 'bottom left',
        targetAttachment: 'bottom right',
      }  
      break;
    case 'bl':
      attachmentConfig = {
        attachment: 'top left',
        targetAttachment: 'bottom left',
      }  
      break;
    case 'br':
      attachmentConfig = {
        attachment: 'top right',
        targetAttachment: 'bottom right',
      }  
      break;
    case 'lt':
      attachmentConfig = {
        attachment: 'top right',
        targetAttachment: 'top left',
      }  
      break;
    case 'lb':
      attachmentConfig = {
        attachment: 'bottom right',
        targetAttachment: 'bottom left',
      }  
      break;
    case 'top':
      attachmentConfig = {
        attachment: 'bottom middle',
        targetAttachment: 'top middle',
      }  
      break;
    case 'right':
      attachmentConfig = {
        attachment: 'middle left',
        targetAttachment: 'middle right',
      }  
      break;
    case 'bottom':
      attachmentConfig = {
        attachment: 'top middle',
        targetAttachment: 'bottom middle',
      }  
      break;
    case 'left':
      attachmentConfig = {
        attachment: 'middle right',
        targetAttachment: 'middle left',
      }  
      break;
    }

    tetherConfig = {
      ...tetherConfig,
      ...attachmentConfig,
    }
    //挂载弹出框位置
    let tether = new Tether(tetherConfig);
    this.setState({
      tether
    });
    //添加blur事件
    if(blur){
      addBlur([comDOM, target], e => {
        //调用blur回调函数
        onBlur(e, this.props.close);
        if(autoClose) return this.props.close();
      })
    }
  }
  componentWillUnmount() {
    this.state.tether.destroy();
  }
  render(){
    let {body} = this.props;
    return React.cloneElement(body, {
      ...this.props,
      ref: 'body',
    })
  }
}
/**
 * 自定义弹出框与它的回调函数
 * @param  body pop组件内容 
 *    三个函数会被注入：
 *    this.props.change
 *    this.props.end
 *    this.props.close
 *    change、end都是传入一个参数，内容组件发生事件时调用的函数
 *    内容组件调用close函数后，弹出框将会消失，
 *    用户点击其他位置导致弹出框消息,close函数也会被调用
 *
 * @param config 配置参数
 *    @param {DOM} target: 真实DOM，相对位置的DOM
 *    @param {Boolean} justify 类似windows右键菜单，让菜单尽量在可视窗口弹出
 *    @param {String} attachment 相对位置,12个可选值: 
 *      top/right/bottom/left/tl/tr/rt/rb/bl/br/lt/lb
 *    @param {Boolean} blur 是否绑定blur事件 true
 *    @param {Function} onBlur blur回调函数： (e, close) => { ... }
 *    @param {Boolean} autoClose 是否触发blur事件后关闭
 *    
 *    
 * @param  cb 弹出组件的回调函数
 *    有三个Hook事件：
 *    change/end/close
 *
 * example：
 * pop(<CustomComponent/>, {
 *    target: this.refs.button,
 *    attachment: 'bottom',
      justify: true,
 * }, (eventName, value) => {})
 */
export function pop(body, config, cb = function(){}){
  let id = uuid.v4();
  let mountedDOM = document.getElementById(id);
  config = {
    justify: true,
    blur: false,
    onBlur: function(){},
    autoClose: true,
    ...config,
  }

  // if(_.isString(body) && body === 'hide'){
  //   ReactDOM.unmountComponentAtNode(mountedDOM)
  //   return;
  // }
  //in case #pop没有被加入
  if(!mountedDOM){
    let div = document.createElement('div');
    div.setAttribute('id', id);
    mountedDOM = document.body.appendChild(div)
  }
  if(!config) throw new Error('调用pop函数时，第二个参数要添加配置');

  let _change = val => cb('change', val);
  let _end = val => cb('end', val);
  let _close = () => {
    cb('close');
    //移除元素，异步执行DOM删除操作以让调用close方法的函数执行完毕
    setTimeout(()=>{
      ReactDOM.unmountComponentAtNode(mountedDOM)
      document.body.removeChild(mountedDOM);
    },0);
  }
  // <Com change={_change} end={_end} close={_close}/>
  ReactDOM.render(<PopCom 
    change={_change} end={_end} close={_close} config={config}
    body={body}>
    </PopCom>, mountedDOM);
}

/**
 * 绑定doms的onBlur事件
 * @param {Array}   doms 被绑定blur事件的doms
 * @param {Function} cb   blur触发回调函数
 * @param {Boolean}   once 事件被触发一次后就被移除(默认true)
 * @return {Function} 移除监听的hook函数，调用后blur处理函数被移除
 */
export function addBlur(doms, cb, once){
  if(doms && !(doms instanceof Array))
    doms = [doms];
  doms.forEach(dom => {
    if(!_.isElement(dom)){
      throw new Error(`${dom} is not an Element`);
    }
  })
  if(once !== true && once !== false)
    once = true;
  function _innerRemoveCallBack(){
    window.removeEventListener('click', _innerClickCallBack, true);
  }
  function _innerClickCallBack(e){
    let flag = false;
    doms.forEach(function(dom){
      if(dom.contains(e.target)){
        flag = true;
        return;
      }
    })
    if(!flag){
      cb(e);
      if(once){
        _innerRemoveCallBack();
      }
    }
  }
  window.addEventListener('click', _innerClickCallBack, true);
  return _innerRemoveCallBack;
}