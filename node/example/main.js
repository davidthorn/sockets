"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../node_modules/mocha-typescript/globals.d.ts"/>
const Server_1 = require("../src/Server");
const environment_json_1 = require("../environment.json");
const server = new Server_1.default(environment_json_1.host, environment_json_1.port);
server.listen();
//# sourceMappingURL=main.js.map