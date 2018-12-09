/// <reference path="../node_modules/mocha-typescript/globals.d.ts"/>
import Server from '../src/Server'
import { port, host } from '../server.json'

const server = new Server(host, port)
server.listen()