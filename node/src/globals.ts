import * as net from 'net'

export type SocketPacket = {
    data: any
}

export type Connection = {
    port: number,
    host: string,
    socket: net.Socket
}