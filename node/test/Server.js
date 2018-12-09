"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Server_1 = require("../src/Server");
const environment_1 = require("../environment");
let ServerUnitTest = class ServerUnitTest extends Server_1.default {
    before() {
        //this.listen(() => {})
    }
    "test that the total number of connections is incremented when creating another connection"(done) {
        let { host, port } = environment_1.default;
        /// need to work out how you can do run this test 
        /// without using promises 
        done();
    }
    after(done) {
        //this.close(done)
        done();
    }
};
__decorate([
    test
], ServerUnitTest.prototype, "test that the total number of connections is incremented when creating another connection", null);
ServerUnitTest = __decorate([
    suite('Server Test')
], ServerUnitTest);
//# sourceMappingURL=Server.js.map