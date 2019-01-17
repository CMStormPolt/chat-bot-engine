const chatBots = require('./chatBots')
const Hapi = require('hapi');
const environment = require('dotenv').config()
const reg = require('hapi-require-https')
const { getBanksAndInsurersFromPospection } = require('./helpers')


let fs = require('fs');
let tls;

if(process.env.USE_SSL){
    let key = fs.readFileSync(process.env.SSL_KEY);
    let cert = fs.readFileSync(process.env.SSL_CERTFICATE);
    let ca = fs.readFileSync(process.env.SSL_CERTFICATE_CA);
    tls = {
        key,
        cert,
        ca
    };

}

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
    host: process.env.HOST || '0.0.0.0', 
    port: process.env.PORT || 8101,
    tls: process.env.USE_SSL ? tls : null
});

server.register({
    register: reg,
    options: {}
  })

let botInitializations = chatBots.registerBots(server,['facebook','cli', 'viber'])

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

        return reply('hello there')
    }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    getBanksAndInsurersFromPospection()
    botInitializations.forEach((botInit)=>{
       
        botInit()
    })
    console.log('Server running at:', server.info.uri);
});