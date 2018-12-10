import { ServerCluster } from '../src/ServerCluster'
import environment from '../environment'

const { host, port } = environment

const server = new ServerCluster(host, port , 2)
server.listen()