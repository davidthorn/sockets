"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServerCluster_1 = require("../src/ServerCluster");
const environment_1 = require("../environment");
const { host, port } = environment_1.default;
const server = new ServerCluster_1.default(host, port, 2);
server.listen();
//# sourceMappingURL=cluster.js.map