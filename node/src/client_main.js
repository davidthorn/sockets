"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("./client");
const environment_json_1 = require("./environment.json");
let socketClient = new client_1.default(environment_json_1.host, environment_json_1.port);
socketClient.connect(client => {
});
//# sourceMappingURL=client_main.js.map