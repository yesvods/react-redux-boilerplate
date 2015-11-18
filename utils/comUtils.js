import Tether from 'tether';
class PopCom extends React.Component {
  constructor(){
    super();
    this.state = {};
  }
  componentDidMount() {
    let { attachment, justify, target } =  this.props.config;
    let tetherConfig = {
      element: ReactDOM.findDOMNode(this.refs.body),
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
    let tether = new Tether(tetherConfig);
    this.setState({
      tether
    });
  }
  componentWillUnmount() {
    this.state.tether.destroy();
  }
  render(){
    let {body} = this.props;
    return <body.type {...this.props} {...body.props} ref="body"/>
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
 * target: 真实DOM，相对位置的DOM
 * justify: 类似windows右键菜单，让菜单尽量在可视窗口弹出
 * attachment: 相对位置,12个可选值: top/right/bottom/left/tl/tr/rt/rb/bl/br/lt/lb
 *    
 * @param  cb 弹出组件的回调函数
 *  有三个Hook事件：
 *  change/end/close
 *
 * Notification:
 * 调用pop('hide')关闭pop组件不会触发close事件
 *
 * example：
 * pop(<CustomComponent/>, {
 *    target: this.refs.button,
 *    attachment: 'bottom',
      justify: true,
 * }, (eventName, value) => {})
 */
export function pop(body, config = {
  justify: true,
}, cb = function(){}){
  let mountedDOM = document.getElementById('pop');
  if(_.isString(body) && body === 'hide'){
    ReactDOM.unmountComponentAtNode(mountedDOM)
    return;
  }
  //in case #pop没有被加入
  if(!mountedDOM){
    let div = document.createElement('div');
    mountedDOM = document.body.appendChild(div);
  }
  if(!config) throw new Error('调用pop函数时，第二个参数要添加配置');

  let _change = val => cb('change', val);
  let _end = val => cb('end', val);
  let _close = () => {
    cb('close');
    //移除元素，异步执行DOM删除操作以让调用close方法的函数执行完毕
    setTimeout(()=>{
      ReactDOM.unmountComponentAtNode(mountedDOM)
    },0);
  }
  // <Com change={_change} end={_end} close={_close}/>
  ReactDOM.render(<PopCom 
    change={_change} end={_end} close={_close} config={config}
    body={body}>
    </PopCom>, mountedDOM);
}