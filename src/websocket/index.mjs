import Events from '../event/index.mjs'

const md5 = str => {
  // todo
  return encodeURIComponent(str)
}

export const MSG_TYPE = {
  /*
   * 心跳
   * */
  HEARTBEAT_CHECK: 0,
  /*
   *  文本
   * */
  TEXT: 1,
  /*
   * 图片
   * */
  IMAGE: 2
}

export const SEND_MSG_TYPE = {
  /*
   * 心跳
   * */
  HEARTBEAT_CHECK: 1,
  /*
   * 回执
   * */
  ACK: 2
}

const HEARTBEAT_TIME = 30 * 1000

/*
 * 消息通道类
 * 接收报文
 * {
 *  "id":"消息id",
 *  "msgType": 1, 0--心跳  1--文本  2--图片url
 *  "content": "http://www.baidu.com" 内容 { "bizType":"","content":""}
 * }
 *
 * 发送报文
 * {
 *  "type":1   1-心跳 2-ack
 * }
 * 对外暴露 init reconnection sendMessage destroy方法
 * 对外暴露 open message error close 事件
 * e.g let instance =  MessageChannel.init({url:''}); instance.on('message',data=>{console.log(data)})
 * */

class MessageChannel extends Events {
  timer
  timer2
  count
  __ws__
  url
  static instanceMap = {}

  constructor(url, initEvents = {}) {
    super(initEvents)
    this.timer = null
    this.timer2 = null
    this.count = 0
    this.__ws__ = {}
    this.url = url
    this.connect()
    this.handleMessage()
    this.handleClose()
    this.handleError()
    this.handleBrowserEvent()
  }

  /*
   * 初始化消息通道，同一个websocket只创建一次实例
   * */
  static init({ url }) {
    const instanceId = md5(url)
    if (!MessageChannel.instanceMap[instanceId]) {
      MessageChannel.instanceMap[instanceId] = new MessageChannel(url)
    }
    return MessageChannel.instanceMap[instanceId]
  }

  /*
   * 重新连接
   * */
  reconnection() {
    let initEvents = {}
    const instanceId = md5(this.url)
    if (this.__ws__.readyState !== WebSocket.CONNECTING && this.__ws__.readyState !== WebSocket.OPEN) {
      this.closeWebSocket()
      if (MessageChannel.instanceMap[instanceId]) {
        initEvents = MessageChannel.instanceMap[instanceId].events
      }
      Object.assign(MessageChannel.instanceMap[instanceId], new MessageChannel(this.url, initEvents))
    }
  }

  /*
   * 发送消息
   * */
  sendMessage(message) {
    this.__ws__.send(JSON.stringify(message))
  }

  /*
   * 销毁消息通道
   * */
  destroy() {
    this.closeWebSocket()
    const instanceId = md5(this.url)
    delete MessageChannel.instanceMap[instanceId]
  }

  /*
   * 连接websocket
   * */
  connect() {
    if (window.WebSocket) {
      if (this.__ws__.readyState !== WebSocket.CONNECTING && this.__ws__.readyState !== WebSocket.OPEN) {
        this.__ws__ = new WebSocket(this.url)
        this.__ws__.addEventListener('open', e => {
          console.log('连接成功，ws=', e.target)
          this.emit('open', e)
          this.heartbeatStart()
        })
      }
    } else {
      console.log('浏览器不支持WebSocket')
      this.emit('error', new Error('浏览器不支持WebSocket'))
    }
  }

  /*
   * 接收websocket消息
   * */
  handleMessage() {
    this.__ws__.addEventListener('message', e => {
      const receiveMsg = JSON.parse(e.data)

      // 不是心跳才回执
      if (receiveMsg?.msgType !== MSG_TYPE.HEARTBEAT_CHECK) {
        this.emit('message', receiveMsg)

        // 发送回执报文
        const message = JSON.stringify({
          id: receiveMsg.id,
          type: SEND_MSG_TYPE.ACK
        })
        if (this.__ws__) {
          this.__ws__.send(message)
        }
      } else {
        this.heartbeatReset()
        this.heartbeatStart()
      }
    })
  }

  /*
   * 连接断开
   * */
  handleClose() {
    this.__ws__.addEventListener('close', e => {
      console.log('连接断开，ws=', e.target)
      this.emit('close', e)
    })
  }

  /*
   * 连接错误
   * */
  handleError() {
    this.__ws__.addEventListener('error', e => {
      console.log('连接错误，ws=', e)
      this.closeWebSocket()
      this.emit('error', e)
    })
  }

  /*
   * 监听浏览器事件
   * */
  handleBrowserEvent() {
    window.addEventListener('online', this.reconnection.bind(this))
  }

  /*
   * 心跳开始
   * */
  heartbeatStart() {
    this.timer = window.setTimeout(() => {
      if (this.__ws__.readyState === WebSocket.OPEN) {
        // 连接还在发心跳报文
        const msg = JSON.stringify({
          type: SEND_MSG_TYPE.HEARTBEAT_CHECK
        })
        this.__ws__.send(msg)

        // 心跳补偿，重试三次心跳未应答关闭连接
        this.timer2 = window.setInterval(() => {
          if (this.count < 3) {
            this.count = this.count + 1
            this.__ws__.send(msg)
          } else {
            this.timer2 && clearInterval(this.timer2)
            this.closeWebSocket()
          }
        }, HEARTBEAT_TIME)
      } else {
        // 连接失败时 关闭websocket
        this.closeWebSocket()
      }
    }, HEARTBEAT_TIME)
  }

  /*
   * 心跳重置
   * */
  heartbeatReset() {
    this.count = 0
    this.timer2 && clearInterval(this.timer2)
  }

  /*
   * 关闭webSocket
   * */
  closeWebSocket() {
    this.__ws__.close()
    this.timer && clearTimeout(this.timer)
  }
}

export default MessageChannel
