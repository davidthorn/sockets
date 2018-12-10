"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = require("../src/Server");
const environment_1 = require("../environment");
const { host, port } = environment_1.default;
const server = new Server_1.SocketServer(host, port);
server.listen(() => { });
//# sourceMappingURL=server.js.map