let BlueBird  = require("bluebird");
let co = BlueBird.coroutine
let Parsers = require('./parsers')
let helpers = require('./helpers')
const { getContext, updateContext} = require('./context')
const { getNested, getNestedCore } = require('./ObjectHelper')
const setNested = require('set-value');
const Validators = require('./validators')
const Switchers = require('./switchers')
let preHooks = require('./preHooks')


function checkForHooks(message, hooks){
    let initalMessage = message
    hooks.forEach((hook)=>{
        hook.synonims.forEach((synonim)=>{
            if(synonim === initalMessage.toLowerCase()){ message = hook }
        })
    })
    return message !== initalMessage ? message : ''
}

function addErrors(Errors = { extraFallbacks : [] }, main, internal = {}, status = false){
    Errors.fallBackResponse =  main.fallBackResponse;
    Errors.status = status;
    if(internal.extraFallback){ Errors.extraFallbacks.push(internal.extraFallback) }
    return Errors
}

function getMultypleResponseButtons(values){
    let buttons = values.map((value)=>{
        return {    
                type: 'text',
                title: value,
                payload: value
            }
    })
    return buttons;
}

function validateStarters(message,starters){
    if (!starters) return false
   let validated; 
   let found = starters.find((starter)=>{
       return starter == message
   })
   return validated = found ? true: false
}

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

function checkIfMultypleSameParsed(parsedValues){
    return parsedValues.filter(onlyUnique)
}

function handleMultypleResults(multypleValues, main, type){
    let multypleResultError = {}
    multypleResultError.fallBackResponse = main.handleMultypleFallBack
    multypleResultError.fallBackResponse[0].buttons = getMultypleResponseButtons(multypleValues)
    multypleResultError.status = true
    multypleResultError.type = type
    return multypleResultError
}

function handleMessageResponse(message, step, context, currentStep, script){
    return co(function*(){

        let contextTree, extraInfo = {}, parserResult = {}, finalParsedResult, finalValidatedResult;
        let Errors = { extraFallbacks: [], status: false, failed: 0 }
        let addToContext = {}
        const { handleAnswer } = step;
        message = yield Parsers['defaultParser'](message, {}, context, extraInfo)
        if(handleAnswer.parsing){
            let parsedResults = [], failedParsers = 0;
            
            // yield Promise.all(handleAnswer.parsing.parsers.map((mainParser)=>{
            yield Promise.all(handleAnswer.parsing.parsers.map((mainParser)=>{
                let parserFailed = false
                parserResult[mainParser.name] = { data: message }
                return Promise.all(mainParser.internalParsers.map((parser)=>{
                    return co(function*(){
                        parserResult[mainParser.name] = yield Parsers[parser.name](parserResult[mainParser.name], parser.settings, context, extraInfo)
                        if(parserResult[mainParser.name].data){ parsedResults.push(parserResult[mainParser.name].data) }
                        if(parserResult[mainParser.name].errors){ Errors = addErrors(Errors, handleAnswer.parsing, parser); if(!parserFailed){parserFailed = true, failedParsers += 1 } }
                    })() 
                }))
            }))
            parsedResults = checkIfMultypleSameParsed(parsedResults);
            if(handleAnswer.parsing.parsers.length === failedParsers) { Errors.status = true }
            if(parsedResults.length > 1){ Errors = handleMultypleResults(parsedResults, handleAnswer.parsing, 'parsing') }
            else if(parsedResults.length === 1) { finalParsedResult = parsedResults[0] }
        }

        if(handleAnswer.validators && !Errors.status){
            for(let i = 0; i < handleAnswer.validators.length; i ++){
                if(!Errors.status){
                    let validator = handleAnswer.validators[i]
                    let validatedResult = Validators[validator.name](message, validator.settings, context, extraInfo, finalParsedResult)
                    if(validatedResult instanceof Promise) { validatedResult = yield validatedResult}
                    if(!validatedResult){ Errors = addErrors(Errors, validator, {}, true) }
                    finalValidatedResult = validatedResult
                }
            }
        }
        if(handleAnswer.oneOf && !Errors.status){
            let language = helpers.getOneOf(context, currentStep);
            let validated = validateStarters(message.toLowerCase(), language)
            if(!validated){ step.Errors = addErrors(Errors, handleAnswer.oneOf, {}, true) }
        }

        if(handleAnswer.params && !Errors.status){
            handleAnswer.params.forEach((param)=>{
                param.value = message
                if(param.fromParser){ param.value = finalParsedResult }
                if(param.fromValidation){param.value = finalValidatedResult}
                if(param.fromContext){ param.value = getNestedCore(context, helpers.updatePathFromContext(param.fromContext.path, context)) }
                setNested(addToContext, helpers.updatePathFromContext(param.destPath, context, addToContext), { value: param.value, type: param.type, custom: param.custom || {} })
            })
        }

        if(handleAnswer.switch && !Errors.status){
            let switcherResult = yield hanldeSwitcher({ script, switcher: message, step: handleAnswer.switch, context, currentStep, parsedMessage: finalParsedResult })
            step.nextStep = switcherResult.step
            validated = switcherResult.validated
            // freePass = switcherResult.freePass ? switcherResult.freePass : {};
            contextTree = switcherResult.contextTree
            extraInfo = switcherResult.extraInfo || extraInfo
        }

        if(handleAnswer.updateContext && !Errors.status){
            handleAnswer.updateContext.forEach((updater)=>{
                addToContext = helpers[updater.helperName](context, addToContext, updater.params || {}, extraInfo)
            })
        }
        return { validated: !Errors.status, addToContext, contextTree, extraInfo, step, Errors }
    })()
}
function contextUpdateTemplate({ step, updatedState, context, currentStep, contextTree }){
    let contextUpdate = {
        currentStep: step.nextStep,
        prevStep: currentStep,
        recipientId: context.recipientId,
        contextTree: contextTree || step.contextTree,
        fallBackFailedTimes: 0,
        state: updatedState
    }
    return contextUpdate
}

function getCurrentStep(context, script){
    let { current } = context.contextTree
    let { currentStep } = context.contextTree[current]
    let step = script.steps[currentStep];
    return { currentStep, step }
}

function handlePrehooks(prehooks, context){
    let preHookResult = {
        continueWithProccess: true,
        preHookContextUpdate: {}
    }
    prehooks.forEach((prehook)=>{
        preHookResult = preHooks[prehook.name](context, preHookResult)
    })
    return preHookResult
}



function handleMessage(request, script, bot){
  co(function*(){
    let message = bot.getMessage(request)
    if(message){
    let context = yield getContext(request, bot)
    let hook = checkForHooks(message, script.hooks)
    let { continueWithProccess, preHookContextUpdate } = yield handlePrehooks(script.preHooks, context )

    if(Object.keys(preHookContextUpdate).length){
        context = yield updateContext({
            recipientId: context.recipientId,
            state: preHookContextUpdate
        }, bot) 
    }

    if( !continueWithProccess && !hook){ return }
    let { currentStep, step } = getCurrentStep(context, script) 
    if(hook){
        let contextTree = hook.contextTree
        currentStep = hook.step
        yield updateContext({
            recipientId: context.recipientId,
            contextTree,
            message: hook.message,
            currentStep
        }, bot)
        step = getCurrentStep(context, script).step
    }
    let handleMessageResponseResult = yield handleMessageResponse(message, step, context, currentStep, script)
    let { validated, addToContext, contextTree, extraInfo, Errors } = handleMessageResponseResult
    step = handleMessageResponseResult.step;

    // starts the handle
    if(validated){
        let contextUpdate = contextUpdateTemplate({ step, updatedState: addToContext, context, currentStep , contextTree});
        yield updateContext(contextUpdate, bot);
        console.log(context)
        let newStepResult = getCurrentStep(context, script)
        step = newStepResult.step
        currentStep = newStepResult.currentStep
        step.response.length > 1 ? sendMultyple(currentStep, step.response, context, extraInfo) : send(currentStep, step.response[0], context, extraInfo)
    }
    else if((!validated && Errors.status) && (context.fallBackFailedTimes < script.settings.fallBackFailedTimesLimit || extraInfo.validationFallback)) {
        yield updateContext({fallBackFailedTimes: context.fallBackFailedTimes + 1, recipientId: context.recipientId, freePass: false }, bot)
        Errors.fallBackResponse.length > 1 ? sendMultyple(currentStep, Errors.fallBackResponse, context, extraInfo, Errors.extraFallbacks) : send(currentStep, Errors.fallBackResponse[0], context, extraInfo, Errors.extraFallbacks)
    } else {
        let generalFallBackStep = script.steps[script.settings.fallBackStep]
        yield updateContext({
            recipientId: context.recipientId,
            prevStep: currentStep,
            currentStep: script.settings.fallBackStep || context.nextStep,
            fallBackFailedTimes : 0,
            freePass: false,
            contextTree: generalFallBackStep.contextTree
        }, bot)
        send(script.settings.fallBackStep, generalFallBackStep.response[0], context, extraInfo)
    }
    
    function send(step, message, context, extraInfo, extraMessages = []){
       co(function*(){
        let newMessage = JSON.parse(JSON.stringify(message))
        newMessage.text = helpers.getRandomText(message.text)
        newMessage = helpers.translate(step, newMessage, context, extraInfo);
        if(extraInfo.buttons){newMessage.buttons = extraInfo.buttons}
        
        //customize the message
        if(newMessage.fromContext){
            newMessage.fromContext.forEach((value)=>{
                newMessage.text = newMessage.text.replace(`$${value}$`, context.state[value].value)
            })
        }
        if(newMessage.fromExtraInfo){
            newMessage.fromExtraInfo.forEach((value)=>{
                newMessage.text = newMessage.text.replace(`$${value}$`, extraInfo[value])
            })
        }

        if(newMessage.settings){
            Object.keys(newMessage.settings).forEach((key)=>{
                newMessage.text = newMessage.text.replace(`$${key}$`, newMessage.settings[key])
            })
        }

        if(newMessage.helpers){
            for(let i = 0; i < newMessage.helpers.length; i +=1 ){
                newMessage.text = helpers[newMessage.helpers[i].helperName](context, newMessage.helpers[i].params, newMessage.text, extraInfo);
                if(newMessage.text instanceof Promise){newMessage.text = yield newMessage.text}
            }
        }

        if(newMessage.buttons && newMessage.notFromTranslateButtonHelpers){
            newMessage.buttons = helpers[newMessage.buttons](context, extraInfo);
            if(newMessage.buttons instanceof Promise){newMessage.buttons = yield newMessage.buttons}
        }

        // check for added extra messages
        if(extraMessages.length){
            extraMessages.forEach((extraMessage)=>{
                let newExtraMessage = JSON.parse(JSON.stringify(extraMessage))
                newExtraMessage.text = helpers.getRandomText(extraMessage.text)
                newExtraMessage = helpers.translate(step, newExtraMessage, context, extraInfo);
                if(newExtraMessage.customizeble){
                    if(newMessage.fromContext){
                        newExtraMessage.fromContext.forEach((value)=>{
                            newExtraMessage.text = newExtraMessage.text.replace(`$${value}$`, context.state[value].value)
                        })
                    }
                    if(newExtraMessage.helpers){
                        for(let i = 0; i < newMessage.helpers.length; i +=1 ){
                            newExtraMessage.text = helpers[newExtraMessage.helpers[i].helperName](context, newExtraMessage.helpers[i].params, newExtraMessage.text, extraInfo);
                            // if(newExtraMessage.text instanceof Promise){newExtraMessage.text = yield newExtraMessage.text}
                        }
                    }
            }
            newMessage.text = `${newMessage.text} ${newExtraMessage.text}`
        })
    }
        if(newMessage.text){
            switch(newMessage.type){
                case 'freeText':
                if(newMessage.text){
                    bot.sendTextMessage(newMessage, context)
                }
                break
                case 'predefinedOptions':
                if(newMessage.text && newMessage.buttons){
                    bot.sendTextWithButtons(newMessage, context)
                }
                break
                case 'attachment':
                bot.sendAttachment(newMessage, context)
                break
                case 'buttonTemplate': 
                bot.sendUrlButtons(newMessage, context)
                break
                default: bot.sendDeffault(context)
            }
        }
       })()
    }

    function sendMultyple(step, messages, context, extraInfo){
        let count = 1;
        let len = messages.length
        send(step, messages[0], context, extraInfo)
        let interval = setInterval(()=>{
            send(step, messages[count], context, extraInfo)
            count += 1;
            if(count >= len){clearInterval(interval)}
        },1000)
    }  
  }
 })() 
}


function hanldeSwitcher(params){
    return co(function*(){
          let { script, switcher, step, currentStep, context, freePass = {}, parsedMessage} = params
          let nextStep, contextTree, newStep, validated, extraInfo = {};
                
          if(step.handler){
              switcher = Switchers[step.handler](switcher, step.settings, context, extraInfo, parsedMessage)
          }
  
          switcher = yield helpers.getSwitchers(switcher, context, currentStep)
              if(step[switcher]){
                  if(step[switcher].nextStep){nextStep = step[switcher].nextStep}
                  if(step[switcher].contextTree){contextTree = step[switcher].contextTree; nextStep = context.contextTree[contextTree].currentStep}
                  freePass = step[switcher].freePass || {}
              }
          
          
          return { step: nextStep, freePass, validated , contextTree, extraInfo }
      })()
  }



let global = {
    handleMessage: handleMessage
}

module.exports = global