import { SocketPacket } from './globals'
import * as net from 'net'

export default class SocketClient {

    host: string
    port: number
    socket: net.Socket

    constructor(host: string, port: number) {
        this.host = host
        this.port = port
        this.socket = new net.Socket()
    }

    connect(callback: (client: SocketClient, error?: Error) => void) {

        this.socket.on('close' , () => {
            console.log('socket has ended')
        })

        this.socket.on('error' , (error) => {
            console.log('could not connect')
            callback(this, error)
        })

        this.socket.connect({ port: this.port , host: this.host }, () => {
            console.log('is connected')
            callback(this)
        })
    }

    send(packet: SocketPacket) {
        this.socket.write(JSON.stringify(packet))
    }

}