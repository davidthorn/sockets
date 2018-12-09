"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SocketClient_1 = require("../src/SocketClient");
const server_json_1 = require("../server.json");
let socketClient = new SocketClient_1.default(server_json_1.host, server_json_1.port);
socketClient.connect(client => {
});
//# sourceMappingURL=client_main.js.map