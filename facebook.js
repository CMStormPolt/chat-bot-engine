let BlueBird  = require("bluebird");
let co = BlueBird.coroutine
const request = require('request');
const merge = require('deepmerge')
const helpers = require('./helpers')


function getUserInfo(recipientId, isDev){
    return new Promise((resolve,reject)=>{
        let context = {
            state: {}
        };
        request({
            uri: `https://graph.facebook.com/v2.11/${recipientId}`,
            qs: { access_token: process.env.FB_PAGE_ACCESS_TOKEN },
            // qs: { access_token: 'EAAOFD8UXOZCQBALQnHZAjyTQ7lyFZA0LeiC6qaxtuZAJ7j284xRBZCiMhXmElECj092ZCCRkxmViO2FnGteVZB5Gp6fmqP4SWQgChdhw1I6mu7HhXtzLKgPWcuhtzHfJ6esvNan9jaWn1ZAFWHIh3qLLc11H9aN4NUOTcw2AbCsjIAZDZD' },
            method: 'GET',
          }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              body = JSON.parse(body)
              let firstName = body.first_name;
              let lastName = body.last_name;
              let language = body.locale.slice(0,2) === 'fr' ? 'fr_FR' : 'en_US'
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
                context.language = isDev ? language : "fr_FR";
            //   message.fromBot.mappers.forEach((value)=>{
            //     message.text = message.text.replace(`$${value}`, mappers[value])
            //   })
            //   resolve(message.text)
            resolve(context)
            } else {
                console.log(error, 'error is==========')
                console.log(body, 'the body is==============')
              console.error("Unnable to get info.");
            }
          });  

    })
}


function sendTextMessage(response, context){
    let messageData = {
        recipient: {
          id: context.recipientId
        },
        message: {
          text: response.text,
        }
      };
      return callSendAPI(messageData)
}

function sendTextWithButtons(response, context){
    if(typeof response.buttons === 'string'){response.buttons = helpers[response.buttons](context)}
    let buttons = response.buttons.map((button)=>{
        let fbButton = {
            content_type: button.type,
            title: button.title,
            payload: button.payload
        }
        return fbButton
    })
    let messageData = {
        recipient: {
          id: context.recipientId
        },
        message: {
          text: response.text,
          quick_replies: buttons
        }
      };
      return callSendAPI(messageData)
}

function sendUrlButtons(response, context){
    let messageData
    if(Array.isArray(response.buttons)){
        let buttons = response.buttons.map((button)=>{
            let fbButton = {
                type: button.type || 'web_url',
                url: button.url,
                title: button.title
            }
            return fbButton
        })
        messageData = {
            recipient: {
              id: context.recipientId
            },
            message: {
                attachment:{
                    type: 'template',
                    payload:{
                      template_type: 'button',
                      text: response.text,
                      buttons
                    }
                  }
              }
          }
    }    
    else {
        messageData = {
            recipient: {
              id: context.recipientId
            },
            message: {
              text: response.buttons || response.text,
            }
          };
    }
      return callSendAPI(messageData)
}

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


function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: process.env.FB_PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData

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

function getMessage(request){
    let message = '';
    if(request.payload.entry[0].messaging[0].message){
         if(request.payload.entry[0].messaging[0].message.quick_reply){
            message = request.payload.entry[0].messaging[0].message.quick_reply.payload
         } else if (request.payload.entry[0].messaging[0].message.text){
            message = request.payload.entry[0].messaging[0].message.text
         } 
         return message
    } else {
        return message
     }
}

function getRecipientId(request){
    let id = request.payload && request.payload.entry &&  request.payload.entry[0].messaging && request.payload.entry[0].messaging[0].sender.id
    return id
}

module.exports = {
    name: 'facebook',
    getMessage,
    sendTextMessage,
    sendTextWithButtons,
    sendAttachment,
    getUserInfo,
    getRecipientId,
    sendUrlButtons,
    routes: [
        {
            method: 'GET',
            path:'/facebook', 
            handler: function (request, reply) {
                if (request.query['hub.mode'] === 'subscribe' &&
                request.query['hub.verify_token'] === process.env.FB_VERIFY_TOKEN) {
                console.log("Validating webhook");
                reply(request.query['hub.challenge']).code(200);
            } else {
                console.error("Failed validation. Make sure the validation tokens match.");
                reply().code(403);          
             }
            }
        },
        {
            method: 'POST',
            path:'/facebook', 
            handler: 'handleMessage'
        }
    ]
}


var defaultStateAlone = {
    ammountBorrowed: {
        value: '4000',
        type: 'number',
        custom: {
            forInfo:true,
            prettyName:"Ammmount Borrowed"
        }
    },
    loanContractDate: {
        value: 'Mon Dec 04 2017 00:00:00 GMT+0200',
        // value: 'Mon Dec 01 2014 00:00:00 GMT+0200',
        type: 'date',
        custom: {
            forInfo:true,
            prettyName:"Date of cotract"
        }
    },
    birthDate: {
        value: 'Fri Dec 01 4000 00:00:00 GMT+0200',
        type: 'date',
        custom: {
            forInfo:true,
            prettyName:"Birth Date"
        }
    },
    firstName: {
        value: 'Alexander',
        type: 'name',
        custom: {}
    },
    firstName: {
        value: 'Boqjiev',
        type: 'name',
        custom: {}
    },
    loanBank: {
        value: 'Societe Generale',
        type: 'freeText',
        custom: {
            forInfo:true,
            prettyName:"Loan Bank"
        }
    },
    loanInsuranceSameBank: {
        value: 'yes',
        type: 'freeText',
        custom: {
            forInfo:true,
            prettyName:"Loan Insurance is in the same Bank"
        }
    },
    loanInterestRate: {
        value: '20%',
        type: 'number',
        custom: {
            forInfo:true,
            prettyName:"Loan Interest Rate"
        }
    },
    loans: {
        '1':{
            ammountBorrowed: '4000',
            loanDuration: '20',
            loanInterestRate: '20%'
        },
        '2':{
            ammountBorrowed: '4000',
            loanDuration: '20',
            loanInterestRate: '20%'
        }
    },
    loansNumber: {
        value: '2',
        type: 'freeText',
        custom: {
            forInfo:true,
            prettyName:"Loans Number"
        }
    },
    loanType: {
        value: 'classic loan',
        type: 'freeText',
        custom: {
            forInfo:true,
            prettyName:"Type of Loan"
        }
    },
    morgageCoBorrower: {
        value: 'alone',
        type: 'freeText',
        custom: {
            forInfo:true,
            prettyName:"Mortgage Co-Borrower"
        }
    },
    currentLoan: {
        value: '0',
        type: 'freeText',
        custom: {
            forInfo:true,
            prettyName:"Current Loan"
        }
    },
}




