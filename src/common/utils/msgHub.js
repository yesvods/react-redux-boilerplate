class MsgHub {
  constructor(){
    this.listeners = {};
  }
  on(msgType, fn){
    let listeners = this.listeners;
    if(!listeners[msgType]) listeners[msgType] = [];
    listeners[msgType].push(fn);
  }
  off(fn){
    let listeners = this.listeners;
    Object.keys(listeners)
      .forEach(key => {
        _.remove(listeners[key], listener => listener===fn);
      })
  }
  trigger(msgType, data){
    let listeners = this.listeners;
    if(!listeners[msgType]) return;
    listeners[msgType].forEach(function(fn){
      fn(data)
    })
  }
}
let hub = new MsgHub();
if(typeof io!=='undefined'){
  io.socket.on('msg', function(msg){
    console.log('client receive msg: ');
    console.log(msg)
    console.log(hub)
    hub.trigger(msg.msgChannel, msg)
  })
}

module.exports = hub;