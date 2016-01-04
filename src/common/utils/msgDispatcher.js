/**
 * 全局函数，用于通讯架构
 * 发送封装消息对象到后端
 */
import { checkVars } from 'utils/typeCheck'
/**
 * 发送封装消息到消息系统
 * 必须填的参数: msgChannel::String, to::Array
 * 
 */
export function sendMsg(msgObj){

  checkVars(msgObj, {
    msgChannel: 'string',
    to: 'array',
  });
  
  // Default values are filled before post.
  return new Promise((resolve) => {
    if(typeof io==='undefined') return resolve('SocketIO未引入');
    io.socket.post('/api/msg', {
      fbMaxCount: 0,
      fbMaxPrompt: 'Feedbacks are already exceeded!',
      notificationType: 'normal',
      buffered: true,
      delay: 0,
      msgData: {},
      read: _([]).range(msgObj.to.length).fill(false),
      ...msgObj
    }, (data, jwres) => {
      resolve(jwres);
    });
  })
}

export function sendCallback(cbObj, cb){
  if(!cbObj.msgId){
    throw new Error('sendCallback Error: 请传入反馈消息的msgId！');
  }
  if(typeof io==='undefined') return cb('SocketIO未引入');
  io.socket.post('/api/msgCallback', {
    feedbackData: {},
    ...cbObj
  }, cb);
}
