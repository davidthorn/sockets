import { Connection, SocketPacket } from './globals'
import * as net from 'net'

export default class SocketServer {

    isCluster: boolean = false
    host: string
    port: number
    server: net.Server

    connections: Connection[] = []

    closeListener: any
    errorListener: any
    dataListener: any

    constructor(host: string, port: number, isCluster: boolean = false) {
        this.host = host
        this.port = port
        this.isCluster = isCluster
        this.server = new net.Server()
        this.server.maxConnections = 2
        this.server.on('connection' , (socket: net.Socket) => {
            if(this.isCluster) return
            this.addSocket(socket, this.port)  
            this.outputConnections()
        })         
    }

    closeHandler(callback: () => void) {
        callback()
    }

    listen(callback: () => void) {  
        this.server.on('close' , this.closeHandler.bind(this, callback))
        
        this.server.listen(this.port, this.host , () => {  callback() })
    }

    send(packet: SocketPacket) {
        let s: net.Socket;
    }

    filterConnections(socket: net.Socket): Connection[] {
        return this.connections.filter(c => {
            if((c.host !== socket.remoteAddress) || (c.port !== socket.remotePort && c.host === socket.remoteAddress)) return c
        })
    }

    contains(socket: net.Socket): boolean {
        return this.connections.filter(c => {
            if(c.port === socket.remotePort && c.host === socket.remoteAddress) return c
        }).length === 1
    }

    outputConnections() {
        console.log(`Server: ${this.host}:${this.port}`)
        this.connections.forEach(c => {
            console.log(`connection -> ${c.host}:${c.port}`)
        })
        
        this.server.getConnections((e, count) =>  {
            console.log(`Server: ${this.host}:${this.port}`)
            console.log(`total connections: ${this.connections.length}(${count})`)
        }) 
        console.log('\n')
    }

    addSocket(socket: net.Socket, receivingPort: number) {
        
        if(this.contains(socket)) return 

        this.connections.push({
            port: socket.remotePort,
            host: socket.remoteAddress,
            socket: socket
        })

        socket.on('close', () => {
            this.removeSocket(socket)
            this.outputConnections()
        })

        socket.on('end', () => {
            this.removeSocket(socket)
            this.outputConnections()
        })

        if(receivingPort === this.port) return
        this.outputConnections()

    }

    removeSocket(socket: net.Socket) {
    
        socket.removeAllListeners('close')
        socket.removeAllListeners('error')
        socket.removeAllListeners('data')
        socket.removeAllListeners('connection')
        socket.removeAllListeners('end')
        socket.destroy()
        // console.log(`number of close listeners: ${socket.listenerCount('close')}` )
        // console.log(`number of error listeners: ${socket.listenerCount('error')}` )
        // console.log(`number of data listeners: ${socket.listenerCount('data')}` )
        // console.log(`number of connection listeners: ${socket.listenerCount('connection')}` )
        // console.log(`number of end listeners: ${socket.listenerCount('end')}` )
        this.connections = this.filterConnections(socket)
        
        this.outputConnections()
    }
   
    close(callback: () => void) {

        for(let x = this.connections.length - 1; x >= 0; x--) {
            this.connections[x].socket.end()
            delete this.connections[x]
        }

        this.server.close(() =>  {
            callback()
        })
    }
}