import SocketClient from '../src/SocketClient'
import { port, host } from '../server.json'

let socketClient = new SocketClient(host, port)
socketClient.connect( client => {
})