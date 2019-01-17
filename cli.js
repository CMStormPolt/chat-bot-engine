let BlueBird  = require("bluebird");
let co = BlueBird.coroutine
const request = require('request');
const helpers = require('./helpers')
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ':'
  });
  rl.prompt();

const defaultRecipientId = 'cli123';

function getUserInfo(/*message */recipientId){
    let context = {
        state: {
            firstName: { 
                value: 'Cliname',
                type: 'name',
                custom: {}
            },
            lastName : { 
                value: 'CliLastName',
                type: 'name',
                custom: {}
            }           
        },
        language:  'en_US', // 'fr_FR'
        recipientId: recipientId || defaultRecipientId,

    };
    return new Promise((resolve,reject)=>{
        resolve(context)
    });
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
    console.log(messageData.message.text);
    if (messageData.message.quick_replies) {
            messageData.message.quick_replies
            .map((button) => 
                console.log(button.title + '[' + button.payload + ']')
            ).join(' | ')
    }
}

function getMessage(data){
    return data;
}

let sessions = []

function findInSession(recipientId){
    let session = sessions.find((session)=>{
        return session.recipientId === recipientId
    })
    return session;
}

function addToSession(recipientId){
    return co(function*(){
        let context = yield getUserInfo(recipientId)
        let session = {
            recipientId : context.recipientId,
            state: context.state,
            contextTree: {
                main: {
                    prevStep: '1',
                    nextStep: '1'
                },
                current: 'main'
            },
            language: context.language,
            fallBackFailedTimes: 0,
            freePass: {}
        }
        // session.state = Object.assign(session.state, defaultStateAlone)
        sessions.push(session);
        return session
    })()
}

function updateContext(params){
    let session = findInSession(params.recipientId);
    let current = params.contextTree ? params.contextTree : session.contextTree.current;
    if(session.contextTree[current]){
        session.contextTree[current].prevStep = params.currentStep ? params.currentStep : session.contextTree[current].prevStep
        session.contextTree[current].nextStep = params.nextStep ? params.nextStep : session.contextTree[current].nextStep
    } else {
        session.contextTree[current] = {
            nextStep: params.nextStep,
            prevStep: params.currentStep
        }
    }
    session.contextTree.current = current
    session.freePass = params.freePass || {};
    session.state = Object.assign(session.state,params.state)
    if(params.fallBackFailedTimes || params.fallBackFailedTimes == 0){session.fallBackFailedTimes = params.fallBackFailedTimes; }
  
}

function getContext(request){
    let context
    let recipientId = defaultRecipientId
    let session = findInSession(recipientId);
    if(session){
        context = session
    } else {
        context = addToSession(recipientId) 
    }        
    return context;
}

module.exports = {
    name: 'cli',
    getMessage,
    getContext,
    sendTextMessage,
    sendTextWithButtons,
    updateContext,
    sendAttachment,
    getUserInfo,
    listener: (messageHandler) => {
        rl.on('line', (data) => {
            messageHandler(data);
        })
    }
}


var defaultStateCoBorrower = {
    ammountBorrowed: {
        value: '4000',
        type: 'number',
        custom: {
            forInfo:true,
            prettyName:"Ammmount Borrowed"
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
        }
    },
    loansNumber: {
        value: '1',
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
        value: '1',
        type: 'freeText',
        custom: {
            forInfo:true,
            prettyName:"Current Loan"
        }
    },
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
        }
    },
    loansNumber: {
        value: '1',
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
        value: '1',
        type: 'freeText',
        custom: {
            forInfo:true,
            prettyName:"Current Loan"
        }
    },
    coBorrowerBirthDate: {
        value: 'Fri Dec 01 4000 00:00:00 GMT+0200',
        type: 'date',
        custom: {
            forInfo:true,
            prettyName:"Co-Borrower Birthdate"
        }
    },
    coBorrowerName: {
        value: 'sad',
        type: 'name',
        custom: {
            forInfo:true,
            prettyName:"Co-Borrower Name"
        }
    },
}

