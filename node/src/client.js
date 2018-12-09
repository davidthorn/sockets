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
        this.socket.connect({ port: this.port, host: this.host }, () => {
            console.log('is connected');
            callback(this);
        });
    }
    send(packet) {
        this.socket.write(JSON.stringify(packet));
    }
}
exports.default = SocketClient;
//# sourceMappingURL=client.js.map