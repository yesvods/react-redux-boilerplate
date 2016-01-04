/**
 * 桌面通知模块
 * 返回实例化对象，单例模式，弹出通知锁机制
 * 使用localStroage进行持久化存储
 * 可设置参数：timeout 通知识别码token过期时间(默认30天)
 *            过期后相同token的通知将被再次弹出
 */
import { keyGen } from 'utils/fnUtils';

//初始化Notification以及授权
if (!("Notification" in window)) {
  alert("This browser does not support system notifications");
}
else if (Notification.permission !== 'denied') {
  Notification.requestPermission();
}
//Notification队列管理类
class Noti {
  constructor(){
    //是否正在弹窗
    this.notifing = false;
    //桌面通知队列
    this.notifications = [];
    //桌面通知缓存过期时间
    this.timeout = 1000*60*60*24*30;
    
    //从ls读取存储消息
    let lsData = localStorage.getItem('destopNotification');
    lsData = lsData?JSON.parse(lsData):[];
  
    //检测过期token
    let timestamp = +new Date();
    lsData = lsData.filter(obj => obj.timeout>timestamp);
  
    this.lsData = lsData;
    this.msgObjs = new Set(_.pluck(lsData, 'token'));
  }
  /**
   * 添加桌面通知到队列
   * @param {[string]} title  桌面通知标题
   * @param {[object]} option [桌面通知可选项]
   * @param {[type]} token  通知消息标志字符串
   */
  add({title, option, token}){  
    if(!token) token = keyGen();
    if(!_.isString(token)) console.error('桌面通知模块错误： token必须是字符串');
    if(this.msgObjs.has(token)) return;
    
    this.msgObjs.add(token);
    this.lsData.push({
      token,
      timeout: +new Date() + this.timeout,
    })
    //ls持久化存储消息
    localStorage.setItem('destopNotification', JSON.stringify([...this.lsData]));
    this.notifications.push({
      title, option
    });

    //触发发送桌面通知函数
    this._trigger();
  }
  _trigger(){
    if(this.notifications.length===0 || this.notifing) return;
    let param = this.notifications.shift();
    this.notifing = true;
    let notification = new Notification(param.title, param.option);
    setTimeout(()=>{
      this.notifing = false;
      this._trigger();
    },1500)
    setTimeout(()=>{
      notification.close();
    },4000)
  }
}

let noti = new Noti();
export default noti;