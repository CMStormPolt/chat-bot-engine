let BlueBird  = require("bluebird");
let co = BlueBird.coroutine
const request = require('request');
const merge = require('deepmerge')
const helpers = require('./helpers')
const { variantOne, variantTwo, defaultStateCoBorrower, getDefaultCleanState } = require('./defaultStates')
let sessions = []

function findInSession(recipientId){
    let session = sessions.find((session)=>{
        return session.recipientId === recipientId
    })
    return session;
}

function getDefaultContext(recipientId){
    let context = {
        state: {},
        language: 'en_US',
        recipientId
    };
    return context
}

function addToSession(recipientId, bot){
    

  return co(function*(){
    let proccessEnv = process.env.PROCCESS_ENV
    let isDev = proccessEnv === 'dev'
    
    let context;
    if(bot.getUserInfo){ context = yield bot.getUserInfo(recipientId, isDev) }
    else { context = getDefaultContext(recipientId) }
    let session = getDefaultCleanState(context, isDev) 
    // session.state = Object.assign(session.state, variantOne.state)
    sessions.push(session);
    return session
  })()
}

function checkForRestart(message){
    if(message === 'restart' || message === 'recomencer') return true
    else return false;
}

function updateContext(params, bot){
    return co(function*(){
        let session = findInSession(params.recipientId);
        if(checkForRestart(params.message)){
            session = yield restartContext(session, bot)
        }
        let current = params.contextTree ? params.contextTree : session.contextTree.current;
        if(session.contextTree[current]){
            session.contextTree[current].prevStep = params.prevStep ? params.prevStep : session.contextTree[current].prevStep
            session.contextTree[current].currentStep = params.currentStep ? params.currentStep : session.contextTree[current].currentStep
        } else {
            session.contextTree[current] = {
                currentStep: params.currentStep ? params.currentStep : session.contextTree[current].currentStep,
                prevStep: params.prevStep ? params.prevStep : 'context-tree-initial'
            }
        }
        session.userPath.push(`${params.currentStep} ->`)
        session.contextTree.current = current
        session.freePass = params.freePass || {};
        if(params.state){ session.state = merge(session.state, params.state) }
        if(params.fallBackFailedTimes || params.fallBackFailedTimes == 0){session.fallBackFailedTimes = params.fallBackFailedTimes; }
        return session
      })()
}

function restartContext(context, bot){
    let proccessEnv = process.env.PROCCESS_ENV
    let isDev = proccessEnv === 'dev'
    
    return co(function*(){
        let { recipientId }= context
        let { insuranceCoverage, monthlyInsurancePremiumFixed } = context.state
        let fbInfo = yield bot.getUserInfo(recipientId, isDev)
        let defaultSesion = getDefaultCleanState(context)
        context.state = Object.assign(defaultSesion.state, fbInfo.state)
        context.language = fbInfo.language
        context.state.insuranceCoverage = insuranceCoverage
        context.state.monthlyInsurancePremiumFixed = monthlyInsurancePremiumFixed
            
            return context
      })()
}

function getContext(request, bot){
    return new Promise((resolve,reject)=>{
        let context
        let recipientId = bot.getRecipientId(request);
        let session = findInSession(recipientId);
        if(session){
            context = session
        } else {
            context = addToSession(recipientId, bot) 
        }        
        resolve(context);
    })
}

module.exports = {
    getContext,
    updateContext
}