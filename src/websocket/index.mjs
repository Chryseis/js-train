import Event from '../event/index.mjs'

const HEARTBEAT_TIME = 20 * 1000

class MessageChannel extends Event {
  timer = null
  interval = null

  constructor() {
    super()
  }
}

new MessageChannel()
