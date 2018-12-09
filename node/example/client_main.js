"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SocketClient_1 = require("../src/SocketClient");
const environment_json_1 = require("../environment.json");
let socketClient = new SocketClient_1.default(environment_json_1.host, environment_json_1.port);
socketClient.connect(client => {
});
//# sourceMappingURL=client_main.js.map