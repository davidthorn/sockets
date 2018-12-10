import { SocketServer } from '../src/Server'
import environment from '../environment'

const { host, port } = environment

const server = new SocketServer(host, port)
server.listen(() => {})