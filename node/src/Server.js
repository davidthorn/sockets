"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net = require("net");
class SocketServer {
    constructor(host, port) {
        this.connections = [];
        this.host = host;
        this.port = port;
        this.server = new net.Server();
        this.server.on('connection', (socket) => {
            console.log(`Connection Request from ${socket.remoteAddress}:${socket.remotePort}`);
            socket.on('close', () => {
                this.removeSocket(socket);
                this.outputConnections();
            });
            this.addSocket(socket);
            this.outputConnections();
        });
    }
    listen(callback) {
        this.server.on('close', () => {
            console.log('server stop listening');
            callback();
        });
        this.server.on('listening', () => {
            console.log('other is listening');
            callback();
        });
        this.server.listen(this.port, this.host, () => {
            console.log('is listening');
        });
    }
    send(packet) {
        let s;
    }
    filterConnections(socket) {
        return this.connections.filter(c => {
            if ((c.host !== socket.remoteAddress) || (c.port !== socket.remotePort && c.host === socket.remoteAddress))
                return c;
        });
    }
    outputConnections() {
        console.log(`Connections ${this.connections.length} as one has connected`);
        this.connections.forEach(c => {
            console.log(`${c.host}:${c.port}`);
        });
    }
    addSocket(socket) {
        this.connections = this.filterConnections(socket);
        this.connections.push({
            port: socket.remotePort,
            host: socket.remoteAddress,
            socket: socket
        });
        console.log('connection added');
    }
    removeSocket(socket) {
        this.connections = this.filterConnections(socket);
    }
    close(callback) {
        for (let x = this.connections.length - 1; x >= 0; x--) {
            this.connections[x].socket.end();
            delete this.connections[x];
        }
        this.server.close(() => {
            console.log('server has closed');
            callback();
        });
    }
}
exports.default = SocketServer;
//# sourceMappingURL=Server.js.map