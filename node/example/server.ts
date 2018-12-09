import Server from '../src/Server'
import environment from '../environment'

const { host, port } = environment

const server = new Server(host, port)
server.listen(() => {})