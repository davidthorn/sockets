"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SocketClient_1 = require("../src/SocketClient");
const environment_1 = require("../environment");
const { host, port } = environment_1.default;
let socketClient = new SocketClient_1.default(host, port);
socketClient.connect((client, error) => {
    if (client !== undefined)
        console.log(error);
    return;
    console.log('connected');
});
//# sourceMappingURL=client.js.map