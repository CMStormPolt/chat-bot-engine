let BlueBird  = require("bluebird");
let co = BlueBird.coroutine
const request = require('request');
let global  = require('./global')
let script = require('./mainScript')

// const { Bot } = require('viber-bot');
// const { Events }= require('viber-bot');

function getViberName(name){
    name = name.split(' ');
    if(name.length === 1){ return { firstName: name[0], lastName: 'no info' } }
    else if(name.length === 2) { return { firstName: name[0], lastName: name[1] } }
}

function getUserInfo(recipientId, isDev){
    return new Promise((resolve,reject)=>{
        let context = {
            state: {}
        };
        request({
            uri: `https://chatapi.viber.com/pa/get_user_details`,
            json: {id: recipientId },
            headers: { 'X-Viber-Auth-Token': process.env.VIBER_TOKEN },
            method: 'POST',
          }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              let firstName, lastName, language
              if(body.status === 0){
                let names = getViberName(body.user.name)
                firstName = names.firstName;
                lastName = names.lastName;
                // language = body.user.language === 'fr' ? 'fr_FR' : 'en_US'
                language = isDev ? body.user.language === 'fr' ? 'fr_FR' : 'en_US' : 'fr_FR'
              } else {
                  firstName = 'champ';
                  lastName = 'best';
                  language = 'en_US'
              }

            //   let mappers = {firstName, lastName}
              context.recipientId = recipientId
              context.state.firstName = { 
                value: firstName,
                type: 'name',
                custom: {}
                },
              context.state.lastName = { 
                value: lastName,
                type: 'name',
                custom: {}
                },
                context.language = language;
            //   message.fromBot.mappers.forEach((value)=>{
            //     message.text = message.text.replace(`$${value}`, mappers[value])
            //   })
            //   resolve(message.text)
            resolve(context)
            } else {
              console.error("Unnable to get viber info.");
            }
          });  

    })
}


function viberInit(){
    let setWebHookData = {
        "url": `${process.env.NGROK_LINK}/viber-webhook`,
        "event_types":[]
     }
    request({
        uri: 'https://chatapi.viber.com/pa/set_webhook',
        headers: {
            'X-Viber-Auth-Token': process.env.VIBER_TOKEN
        },
        method: 'POST',
        json: setWebHookData
    }
  )
}

function checkForRequestWebhook(request){
    let webhook = request.payload && request.payload.event && request.payload.event === 'webhook'
    return webhook ? webhook : false
}

function getMessage(request){
    let message = '';
    if(request.payload && request.payload.message){
         if(request.payload.message.text){
            message = request.payload.message.text
         } 
    } 
    return message
}

function getRecipientId(request){
    let id = request.payload && request.payload.sender && request.payload.sender.id
    return id
}

function sendTextMessage(response, context){
    let messageData = {
        receiver: context.recipientId,
        min_api_version: 1,
        // sender:{
        //     name: "John McClane",
        //     "avatar":"http://avatar.example.com"
        //  },
        tracking_data: 'tracking data',
        type: 'text',
        text: response.text
      };
      return callSendAPI(messageData)
}

function sendTextWithButtons(response, context){
    if(typeof response.buttons === 'string'){response.buttons = helpers[response.buttons](context)}
    let buttons = response.buttons.map((button)=>{
        let fbButton = {
            Columns: 6,
            Rows: 1,
            BgColor: '#2db9b9',
            // BgMediaType: 'gif',
            // BgMedia: 'http://www.url.by/test.gif',
            // BgLoop: true,
            // ActionType: 'open-url',
            // Image: 'www.tut.by/img.jpg',
            ActionBody: button.payload,
            Text: button.title,
            TextVAlign: 'middle',
            TextHAlign: 'center',
            TextOpacity: 60,
            TextSize: 'regular'
            // content_type: button.type,d
        }
        return fbButton
    })
    let messageData = {
        receiver: context.recipientId,
        min_api_version: 1,
        // sender:{
        //     name: "John McClane",
        //     "avatar":"http://avatar.example.com"
        //  },
        tracking_data: 'tracking data',
        type: 'text',
        text: response.text,
        keyboard: {
            DefaultHeight: true,
            Type:'keyboard',
            BgColor: '#FFFFFF',
            Buttons: buttons
        }
      };


      return callSendAPI(messageData)
}

function callSendAPI(messageData) {
    request({
      uri: 'https://chatapi.viber.com/pa/send_message',
      method: 'POST',
      json: messageData,
      headers: {
        'X-Viber-Auth-Token': process.env.VIBER_TOKEN
      }
    }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var recipientId = body.recipient_id;
        var messageId = body.message_id;
  
          console.log("Successfully sent generic message with id %s to recipient %s", 
          messageId, recipientId);
      } else {
          console.log(body)
          console.error("Unable to send message.");
      }
    });  
  }
  



let viberExport = {
    name: 'viber',
    getMessage,
    getRecipientId,
    sendTextMessage,
    sendTextWithButtons,
    // sendAttachment,
    getUserInfo,
    routes: [
        {
            method: 'POST',
            path:'/viber-webhook', 
            handler: function (request, reply) {
                if(checkForRequestWebhook(request)){console.log("Validating viber webhook");  reply().code(200);}
                else {
                    reply().code(200)
                    global.handleMessage(request, script, viberExport)
               }
            }
        }
    ],
    init: viberInit
}   
module.exports = viberExport



function sendAttachment(response, context){
    let messageData = {
        recipient: {
          id: context.recipientId
        },
        message: {
            attachment: {
            type: response.attachment_type, 
            payload :{
              url: response.attachment_url
                 }
              }
          }
      }
      return callSendAPI(messageData)
}

function sendAttachmentWithText(response, context){
    let messageData = {
        recipient: {
          id: context.recipientId
        },
        message: {
            attachment: {
            type: response.attachment_type, 
            payload :{
              url: response.attachment_url
                 }
              }
          }
      }
      return callSendAPI(messageData)
}

















// const bot = new ViberBot({
// 	authToken: YOUR_AUTH_TOKEN_HERE,
// 	name: "EchoBot",
// 	avatar: "http://viber.com/avatar.jpg" // It is recommended to be 720x720, and no more than 100kb.
// });

// // Perfect! Now here's the key part:
// bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
// 	// Echo's back the message to the client. Your bot logic should sit here.
// 	response.send(message);
// });


// // Viber will push messages sent to this URL. Web server should be internet-facing.
// const webhookUrl = process.env.WEBHOOK_URL;

// const httpsOptions = {
// 	key: ...,
// 	cert: ...,
// 	ca: ...
// }; // Trusted SSL certification (not self-signed).
// https.createServer(httpsOptions, bot.middleware()).listen(port, () => bot.setWebhook(webhookUrl));