"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const net = require("net");
class SocketClient {
    constructor(host, port) {
        this.host = host;
        this.port = port;
        this.socket = new net.Socket();
    }
    connect(callback) {
        let stepUp = undefined;
        this.socket.on('data', (buffer) => {
            try {
                let data = JSON.parse(buffer.toString('utf8'));
                stepUp = data;
                this.stepup(stepUp, callback);
            }
            catch (error) {
                callback(error);
            }
            console.log('socket has ended');
        });
        this.socket.on('close', () => {
            this.socket.removeAllListeners('close');
            this.socket.removeAllListeners('error');
            this.socket.removeAllListeners('data');
            this.socket.removeAllListeners('connection');
            if (stepUp === undefined)
                callback(this, new Error('Stepup data is undefined'));
            console.log('socket has ended');
        });
        this.socket.on('error', (error) => {
            console.log('could not connect');
            callback(this, error);
        });
        this.socket.connect({ port: this.port, host: this.host }, () => {
            console.log('is connected');
            callback(this);
        });
    }
    stepup(data, callback) {
        this.stepUp = new net.Socket();
        this.stepUp.on('data', (buffer) => {
            console.log('stepUp socket has ended');
        });
        this.stepUp.on('close', () => {
            console.log('stepUp socket has ended');
        });
        this.stepUp.on('error', (error) => {
            console.log('stepUp could not connect');
            callback(this, error);
        });
        this.stepUp.connect({ port: data.port, host: data.host }, () => {
            console.log('stepUp is connected');
            callback(this);
        });
    }
    send(packet) {
        this.socket.write(JSON.stringify(packet));
    }
}
exports.SocketClient = SocketClient;
//# sourceMappingURL=SocketClient.js.map