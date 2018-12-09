/// <reference path="../node_modules/mocha-typescript/globals.d.ts"/>
import { expect } from 'chai'
import Server from '../src/Server'
import SocketClient from '../src/SocketClient'
import environment from '../environment'

@suite('Server Test')
class ServerUnitTest extends Server {

   before() {
        
        //this.listen(() => {})
   } 

   @test "test that the total number of connections is incremented when creating another connection"(done) {

        let { host, port } = environment
        /// need to work out how you can do run this test 
        /// without using promises 
          
        done()

    }

   after(done) {
       //this.close(done)
       done()
   }
}