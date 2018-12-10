import { SocketServer } from './Server'
import environment from '../environment'
import * as net from 'net'
import * as events from 'events'

events.EventEmitter.defaultMaxListeners = 6

export class ServerCluster {

    host: string
    port: number
    startPort: number
    max: number
    clusterServer: SocketServer
    
    servers: SocketServer[] = []
    sockets: net.Socket[] = []

    constructor(host: string, port: number , max: number ) {
        this.host = host
        this.port = port
        this.startPort = port + 1
        this.max = max
        this.clusterServer = new SocketServer(host, port , true)
    }

    /**
     * Create the required number of server which are required in the cluster
     *
     * @memberof ServerCluster
     */
    create(): SocketServer {
        let index = this.servers.length
        let childServer = new SocketServer(this.host, this.startPort)
        this.startPort += 1

        this.servers.push(childServer)
        
        childServer.server.on('connection' , (socket) => {
            let y = index
            this.sockets.push(socket)
            this.servers.forEach((s, i) => {
                //if(i === index) return
                this.sockets.forEach(s => {
                    this.servers[i].addSocket(s , childServer.port )
                }) 
            })

            // this.servers.forEach(s => {
            //     s.outputConnections()
            // })
        }) 

        return childServer
    }

    /**
     * Should initiating to 
     *
     * @memberof ServerCluster
     */
    listen() {

        this.clusterServer.server.on('connection' , (socket: net.Socket) => {
            if(this.servers.length === events.EventEmitter.defaultMaxListeners - 2) {
                socket.destroy(new Error('too many connections'))
                return
            }

            let index = this.servers.length
            let server = this.create()
            socket.write(JSON.stringify({ host: this.host , port: server.port }))
            socket.end()
            socket.destroy()
            
            server.listen(() => {
                console.log(`Server ${index} listening ${server.host}:${server.port}`)
            })

        })


        this.clusterServer.listen(() => {
            console.log('cluster server is listening')
        })

    }

}