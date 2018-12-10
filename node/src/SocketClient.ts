import { SocketPacket } from './globals'
import * as net from 'net'

export class SocketClient {

    host: string
    port: number
    socket: net.Socket
    stepUp?: net.Socket

    constructor(host: string, port: number) {
        this.host = host
        this.port = port
        this.socket = new net.Socket()
    }

    connect(callback: (client: SocketClient, error?: Error) => void) {

        let stepUp: { host: string, port: number } = undefined

        this.socket.on('data' , (buffer: Buffer) => {
            try {
                let data = JSON.parse(buffer.toString('utf8'))
                stepUp = data
                this.stepup(stepUp , callback)
            } catch(error) { callback(error) }
            console.log('socket has ended')
        })

        this.socket.on('close' , () => {
            this.socket.removeAllListeners('close')
            this.socket.removeAllListeners('error')
            this.socket.removeAllListeners('data')
            this.socket.removeAllListeners('connection')
            if(stepUp === undefined) callback(this, new Error('Stepup data is undefined'))
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

    stepup(data: { host: string, port: number }, callback: (client: SocketClient, error?: Error) => void) {

        this.stepUp = new net.Socket()

        this.stepUp.on('data' , (buffer: Buffer) => {
            console.log('stepUp socket has ended')
        })

        this.stepUp.on('close' , () => {
            console.log('stepUp socket has ended')
        })

        this.stepUp.on('error' , (error) => {
            console.log('stepUp could not connect')
            callback(this, error)
        })

        this.stepUp.connect({ port: data.port , host: data.host }, () => {
            console.log('stepUp is connected')
            callback(this)
        })
    }

    send(packet: SocketPacket) {
        this.socket.write(JSON.stringify(packet))
    }

}