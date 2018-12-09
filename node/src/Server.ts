/// <reference path="./globals.d.ts"/>
import { Connection, SocketPacket } from './globals'
import * as net from 'net'
import { timingSafeEqual } from 'crypto';

export default class SocketServer {

    host: string
    port: number
    server: net.Server

    connections: Connection[] = []

    constructor(host: string, port: number) {
        this.host = host
        this.port = port
        this.server = new net.Server()

        this.server.on('connection' , (socket: net.Socket) => {
            
            console.log(`Connection Request from ${socket.remoteAddress}:${socket.remotePort}`)
            
            socket.on('close', () => {
                this.removeSocket(socket)
                this.outputConnections()
            })

            this.addSocket(socket)
            this.outputConnections()
        })
    }

    listen() {  
        this.server.listen(this.port, this.host , () => {
            console.log('is listening')
        })
    }

    send(packet: SocketPacket) {
        let s: net.Socket;
    }

    filterConnections(socket: net.Socket): Connection[] {
        return this.connections.filter(c => {
            if((c.host !== socket.remoteAddress) || (c.port !== socket.remotePort && c.host === socket.remoteAddress)) return c
        })
    }

    outputConnections() {
        console.log(`Connections ${this.connections.length} as one has connected`)
            this.connections.forEach(c => {
                console.log(`${c.host}:${c.port}`)
            })
    }

    addSocket(socket: net.Socket) {
        this.connections = this.filterConnections(socket)
            
        this.connections.push({
            port: socket.remotePort,
            host: socket.remoteAddress,
            socket: socket
        })
    }

    removeSocket(socket: net.Socket) {
        this.connections = this.filterConnections(socket)
    }
   
}