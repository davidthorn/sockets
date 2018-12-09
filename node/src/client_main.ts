import SocketClient from './client'
import { port, host } from './environment.json'

let socketClient = new SocketClient(host, port)
socketClient.connect( client => {

    

})