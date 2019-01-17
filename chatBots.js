let BlueBird  = require("bluebird");
let co = BlueBird.coroutine
let Parsers = require('./parsers')
let helpers = require('./helpers')
let facebook = require('./facebook')
let cli = require('./cli')
let viber = require('./viber')
let global = require('./global')
const { getNested, getNestedCore } = require('./ObjectHelper')
const setNested = require('set-value');
const Validators = require('./validators')
const Switchers = require('./switchers')

const avaibleBots = {
    facebook,
    cli,
    viber
}



const answerTypes = {
    freeText: 'freeText',
    predefinedOptions: 'predefinedOptions',
    // optionsAfterFreeText: 'optionsAfterFreeText',
    attachment: 'attachment'
};

const script = require('./mainScript')
function registerRoute(server,route, bot){
    let handler
    if(typeof route.handler === 'string'){
        handler = function(request,reply){
            reply().code(200);
            global[route.handler](request, script, bot)
        }
    }
    let registeredRoute = {
        method: route.method,
        path: route.path, 
        handler: handler ? handler : route.handler 
    }
    return server.route(registeredRoute)
}

function registerBots(server, bots){
    let botInits = []
    bots.forEach((bot)=>{
        if(avaibleBots[bot]){
        bot = avaibleBots[bot]
        if(bot.init){botInits.push(bot.init)}
        if (bot.routes) {
            bot.routes.forEach((route)=>{
                registerRoute(server, route, bot)
            })    
        }else if(bot.listener) {
            bot.listener((data) => {
                handleMessage(data, script, bot);
            })
        }
       }
    })
    return botInits
}


module.exports = {
    registerBots
}
