import { SocketClient } from '../src/SocketClient'
import environment from '../environment'

const { host, port } = environment

let socketClient = new SocketClient(host, port)
socketClient.connect((client, error) => {
    if(client !== undefined) console.log(error); return 
    console.log('connected')

})